using AutoMapper;
using Backend.Models.Dtos;
using Backend.Models;
using Backend.Request;
using Backend.Services.RepositoryServices;

namespace Backend.Services.BussinessServices
{
    public class NghiPhepServices
    {
        private readonly NghiPhepRepositoryServices _nghiPhepRepositoryServices;
        private readonly NguoiDungRepositoryServices _nguoiDungRepositoryServices;
        private readonly IMapper _mapper;
        public NghiPhepServices(NghiPhepRepositoryServices nghiPhepRepositoryServices, NguoiDungRepositoryServices nguoiDungRepositoryServices, IMapper mapper)
        {
            _nghiPhepRepositoryServices = nghiPhepRepositoryServices;
            _nguoiDungRepositoryServices = nguoiDungRepositoryServices;
            _mapper = mapper;
        }

        public async Task<Nghiphep?> FindByIdAsync(int maNghiphep)
        {
            return await _nghiPhepRepositoryServices.FindByIdAsync(maNghiphep);
        }

        public async Task<List<NghiPhepResponse>> FindAllAsync(int top, int skip, string? filter)
        {
            List<NghiPhepResponse> nghiPhepResponses = new List<NghiPhepResponse>();
            List<Nghiphep> nghipheps = await _nghiPhepRepositoryServices.FindAll(top, skip, filter);
            foreach (Nghiphep nghiphep in nghipheps)
            {
                NghiPhepResponse nghiPhepResponse = new NghiPhepResponse
                {
                    Manghiphep = nghiphep.Manghiphep,
                    Ngaybatdau = nghiphep.Ngaybatdau,
                    Ngayketthuc = nghiphep.Ngayketthuc,
                    Lydo = nghiphep.Lydo,
                    Trangthai = nghiphep.Trangthai,
                    Tennguoidung = nghiphep.ManguoidungNavigation.Hoten,
                    Lydotuchoi = nghiphep.Lydotuchoi,
                    NgaydangKi = nghiphep.NgaydangKi,
                    Loainghiphep = nghiphep .Loainghiphep,

                };
                nghiPhepResponses.Add(nghiPhepResponse);
            }
            return nghiPhepResponses;

        }

        public async Task<List<Nghiphep>> FindAllLeaveUserAsync(int maNguoiDung)
        {
            return await _nghiPhepRepositoryServices.FindAllNghiPhepUserAsync(maNguoiDung);
        }

        public async Task<PostDto> AddNghiPhep(NghiPhepRequest nghiPhepRequest)
        {
            if (nghiPhepRequest == null)
            {
                return new PostDto
                {
                    Success = 0,
                    Message = "Dang ki nghi phep khong hop le"
                };
            }
            if (await _nguoiDungRepositoryServices.FindByIdAsync(nghiPhepRequest.Manguoidung) == null)
            {
                return new PostDto
                {
                    Success = 0,
                    Message = "Nguoi dung khong ton tai"
                };
            }
            else
            {
                Nghiphep Nghiphep = _mapper.Map<Nghiphep>(nghiPhepRequest);
                PostDto result = await _nghiPhepRepositoryServices.AddNghiPhep(Nghiphep);
                return result;
            }

        }

        public async Task<PostDto> UpdateStatusNghiPhep(UpdateStatusNghiPhepRequest updateStatusNghiPhepRequest)
        {
            if (updateStatusNghiPhepRequest == null)
            {
                return new PostDto
                {
                    Success = 0,
                    Message = "Dang ki OT khong hop le"
                };
            }
            else
            {
                try
                {
                    Nghiphep nghiphep = new Nghiphep
                    {
                        Manghiphep = updateStatusNghiPhepRequest.Manghiphep,
                        Trangthai = updateStatusNghiPhepRequest.Trangthai,
                    };
                    await _nghiPhepRepositoryServices.UpdateStatusNghiPhep(nghiphep);
                    return new PostDto
                    {
                        Success = 1,
                    };
                }
                catch (Exception ex)
                {
                    return new PostDto
                    {
                        Success = 0,
                        Message = ex.Message
                    };
                }

            }

        }
    }
}
