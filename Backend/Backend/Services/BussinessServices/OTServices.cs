using AutoMapper;
using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Services.RepositoryServices;

namespace Backend.Services.BussinessServices
{
    public class OTServices
    {
        private readonly OTRepositoryServices _oTRepositoryServices;
        private readonly NguoiDungRepositoryServices _nguoiDungRepositoryServices;
        private readonly IMapper _mapper;
        public OTServices(OTRepositoryServices oTRepositoryServices, NguoiDungRepositoryServices nguoiDungRepositoryServices, IMapper mapper)
        {
            _oTRepositoryServices = oTRepositoryServices;
            _nguoiDungRepositoryServices = nguoiDungRepositoryServices;
            _mapper = mapper;
        }

        public async Task<Dangkiot?> FindByIdAsync(int maDangKiOT)
        {
            return await _oTRepositoryServices.FindByIdAsync(maDangKiOT);
        }

        public async Task<List<DangKiOTResponse>> FindAllAsync(int top, int skip, string? filter)
        {
            List<DangKiOTResponse> dangKiOTResponses = new List<DangKiOTResponse>();
            List<Dangkiot> dangkiots = await _oTRepositoryServices.FindAll(top, skip, filter);
            foreach(Dangkiot dangkiot in dangkiots)
            {
                DangKiOTResponse dangKiOTResponse = new DangKiOTResponse
                {
                    Maot = dangkiot.Maot,
                    Giobatdau = dangkiot.Giobatdau,
                    Gioketthuc = dangkiot.Gioketthuc,
                    Lydo = dangkiot.Lydo,
                    Trangthai = dangkiot.Trangthai,
                    TenNguoiDung = dangkiot.ManguoidungNavigation.Hoten,
                    Lydotuchoi = dangkiot.Lydotuchoi,
                    NgaydangKi = dangkiot.NgaydangKi

                };
                dangKiOTResponses.Add(dangKiOTResponse);
            }
            return dangKiOTResponses;

        }

        public async Task<List<Dangkiot>> FindAllOTUserAsync(int maNguoiDung)
        {
            return await _oTRepositoryServices.FindAllOTUserAsync(maNguoiDung);
        }

        public Task<Dangkiot?> FindByDateAsync(int maDiemDanh, string date)
        {
            return _oTRepositoryServices.FindByDate(maDiemDanh, date);
        }

        public async Task<PostDto> AddOT(OTRequest oTRequest)
        {
            if (oTRequest == null)
            {
                return new PostDto
                {
                    Success = 0,
                    Message = "Dang ki OT khong hop le"
                };
            }
            if(await _nguoiDungRepositoryServices.FindByIdAsync(oTRequest.MaNguoiDung) == null)
            {
                return new PostDto
                {
                    Success = 0,
                    Message = "Nguoi dung khong ton tai"
                };
            }
            else
            {
                Dangkiot dangkiot = _mapper.Map<Dangkiot>(oTRequest);
                PostDto result = await _oTRepositoryServices.AddOT(dangkiot);
                return result;          
            }
           
        }

        public async Task<PostDto> UpdateStatusOT(UpdateStatusOTRequest updateStatusOTRequest)
        {
            if (updateStatusOTRequest == null)
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
                    Dangkiot dangkiot = new Dangkiot
                    {
                        Maot = updateStatusOTRequest.Maot,
                        Trangthai = updateStatusOTRequest.Trangthai,
                    };
                    await _oTRepositoryServices.UpdateStatusOT(dangkiot);
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
