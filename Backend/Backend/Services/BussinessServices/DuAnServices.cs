using AutoMapper;
using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Services.RepositoryServices;

namespace Backend.Services.BussinessServices
{
    public class DuAnServices
    {
        private readonly IMapper _mapper;
        private readonly DuAnRepositoryServices _duAnRepositoryServices;
        private readonly NguoiDungRepositoryServices _nguoiDungRepositoryServices;
        private readonly NguoiDungDuAnRepository _nguoiDungDuAnRepository;

        public DuAnServices(IMapper mapper, DuAnRepositoryServices duAnRepositoryServices, NguoiDungRepositoryServices nguoiDungRepositoryServices, NguoiDungDuAnRepository nguoiDungDuAnRepository)
        {
            _mapper = mapper;
            _duAnRepositoryServices = duAnRepositoryServices;
            _nguoiDungRepositoryServices = nguoiDungRepositoryServices;
            _nguoiDungDuAnRepository = nguoiDungDuAnRepository;
        }
        public async Task<Duan?> FindByIdAsync(int maDuAn)
        {
            return await _duAnRepositoryServices.FindByIdAsync(maDuAn);
        }
        public async Task<List<Duan>> FindAllAsync(int top, int skip, string? filter)
        {
            return await _duAnRepositoryServices.FindAllAsync(top, skip, filter);
        }

        public async Task<List<DuAnResponse>> GetCongViec(int maDuan)
        {
            List<DuAnResponse> duAnResponses = new List<DuAnResponse> ();
            Duan duan = await _duAnRepositoryServices.FindByIdAsync(maDuan);
            List<NguoidungDuan> nguoidungCongviecs = duan.NguoidungDuans.ToList();
            List<string> nguoiDungs = new List<string>();
            foreach (NguoidungDuan nguoidungDuan in nguoidungCongviecs)
            {
                Nguoidung nguoidung = (await _nguoiDungDuAnRepository.FindByIdAsync(nguoidungDuan.Id)).ManguoidungNavigation;
                nguoiDungs.Add(nguoidung.Hoten);
            }
            foreach (Congviec congviec in duan.Congviecs)
            {
                DuAnResponse duanResponse = new DuAnResponse
                {
                    maCongViec = congviec.Macongviec,
                    tenDuAn = duan.TenDa,
                    trangThai = congviec.TinhtrangCv.ToString(),
                    tenCongViec = congviec.TenCv,
                    nguoiDungs = string.Join(", ", nguoiDungs)
                };
                duAnResponses.Add(duanResponse);
            }
            return duAnResponses;
        }
        public async Task<PostDto> AddDuAn(DuAnRequest duAnRequest)
        {
            PostDto result = new PostDto();
            try
            {
                Duan duan = new Duan
                {
                    TenDa = duAnRequest.TenDa,
                    SonguoithamgiaDa = duAnRequest.SonguoithamgiaDa,
                    NgaybatdauDa = duAnRequest?.NgaybatdauDa,
                    Ngayketthuc = duAnRequest.Ngayketthuc,
                    TrangthaiDa = duAnRequest.TrangthaiDa,
                    Mota = duAnRequest.Mota

                };
                result = await _duAnRepositoryServices.AddDuAn(duan);
                return result;
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }
    }
}
