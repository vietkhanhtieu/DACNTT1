using Backend.Models.Dtos;
using Backend.Models;
using Backend.Request;
using Backend.Services.RepositoryServices;

namespace Backend.Services.BussinessServices
{
    public class BinhLuanServices
    {
        private readonly BinhLuanRepositoryServices binhLuanRepository;
        private readonly NguoiDungRepositoryServices _nguoiDungRepositoryServices;
        private readonly DuAnRepositoryServices _duAnRepositoryServices;



        public BinhLuanServices(BinhLuanRepositoryServices binhLuanRepository, NguoiDungRepositoryServices nguoiDungRepositoryServices, DuAnRepositoryServices duAnRepositoryServices)
        {
            this.binhLuanRepository = binhLuanRepository;
            _nguoiDungRepositoryServices = nguoiDungRepositoryServices;
            _duAnRepositoryServices = duAnRepositoryServices;
        }

        public async Task<Binhluan?> FindByIdAsync(int id)
        {
            return await binhLuanRepository.FindByIdAsync(id);
        }

        public async Task<List<Binhluan>> FindAllAsync(int top, int skip, string? filter)
        {
            return await binhLuanRepository.FindAllAsync(top, skip, filter);
        }

        public async Task<List<BinhluanResponse>> FindByMaCongViecAsync(int maCongViec)
        {
            List<Binhluan> Binhluans = await binhLuanRepository.FindByMaCongViecAsync(maCongViec);
            List<BinhluanResponse> BinhluanResponses = new List<BinhluanResponse>();
            List<string> strings = new List<string>();
            foreach (Binhluan Binhluan in Binhluans)
            {
                BinhluanResponse BinhluanResponse = new BinhluanResponse
                {
                    MaBinhLuan = Binhluan.Mabinhluan,
                    Macongviec = Binhluan.Macongviec.ToString(),
                    Manguoidung = Binhluan.Manguoidung.ToString(),
                    Noidung = Binhluan.Noidung,
                    Thoigian = Binhluan.Thoigian

                };
                BinhluanResponses.Add(BinhluanResponse);
            }
            return BinhluanResponses;
        }

        public async Task<PostDto> AddBinhluan(BinhluanRequest BinhluanRequest)
        {
            PostDto result = new PostDto();
            Nguoidung nguoidung = await _nguoiDungRepositoryServices.FindByIdAsync(BinhluanRequest.Manguoidung);
            if (nguoidung == null)
            {
                result.Success = 0;
                result.Message = "Không tìm thấy người dùng";
                return result;
            }
            try
            {
                Binhluan Binhluan = new Binhluan
                {
                    Manguoidung = BinhluanRequest.Manguoidung,
                    Macongviec = BinhluanRequest.Macongviec,
                    Noidung = BinhluanRequest.Noidung,
                    Thoigian = BinhluanRequest.Thoigian
                };
                result = await binhLuanRepository.AddBinhluan(Binhluan);
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
