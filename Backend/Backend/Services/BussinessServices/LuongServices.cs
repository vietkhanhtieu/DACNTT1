using AutoMapper;
using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Services.RepositoryServices;

namespace Backend.Services.BussinessServices
{
    public class LuongServices
    {

        private readonly LuongRepositoryServices _luongRepositoryServices;
        private readonly NguoiDungRepositoryServices _nguoiDungRepositoryServices;
        private readonly IMapper _mapper;

        public LuongServices(LuongRepositoryServices luongRepositoryServices, IMapper mapper, NguoiDungRepositoryServices nguoiDungRepositoryServices)
        {
            _luongRepositoryServices = luongRepositoryServices;
            _mapper = mapper;
            _nguoiDungRepositoryServices = nguoiDungRepositoryServices;
        }

        public async Task<Luong?> FindByIdAsync(int maLuong)
        {
            return await _luongRepositoryServices.FindByIdAsync(maLuong);
        }

        public async Task<List<Luong>> FindAllAsync(int top, int skip, string? filter)
        {
            return await _luongRepositoryServices.FindAllAsync(top, skip, filter);
        }

        public async Task<Luong?> FindByMonth(int maNguoiDung, int thang, int nam)
        {
            return await _luongRepositoryServices.FindByMonth(maNguoiDung, thang, nam);
        }

        public async Task<PostDto> AddLuong(LuongRequest luongRequest)
        {
            PostDto result = new PostDto();
            Nguoidung nguoidung = await _nguoiDungRepositoryServices.FindByIdAsync(luongRequest.Manguoidung);
            if (nguoidung == null)
            {
                result.Success = 0;
                result.Message = "Không tìm thấy người dùng";
                return result;
            }
            try
            {
                Luong luong = _mapper.Map<Luong>(luongRequest);
                luong.Tongthu = luong.Luongchinh + luong.Luonghieuqua + luong.Luongngoaigio + luong.Luongboiduong + luong.Phiguixe + luong.Luongthuong + luong.Phucapcom + luong.Thuongsinhnhat;
                luong.Tongchi = luong.Bhxh + luong.Thuetncn + luong.Tamung;
                result = await _luongRepositoryServices.AddLuong(luong);
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
