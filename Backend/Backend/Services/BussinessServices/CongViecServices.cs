using Backend.Models.Dtos;
using Backend.Models;
using Backend.Request;
using Backend.Services.RepositoryServices;
using System.Collections.Generic;

namespace Backend.Services.BussinessServices
{
    public class CongViecServices
    {
        private readonly CongViecRepositoryServices congViecRepositoryServices;
        private readonly BinhLuanRepositoryServices binhLuanRepositoryServices;
        private readonly NguoidungCongviecRepositoryServices nguoidungCongviecRepositoryServices;

        public CongViecServices(CongViecRepositoryServices congViecRepositoryServices, BinhLuanRepositoryServices binhLuanRepositoryServices, NguoidungCongviecRepositoryServices nguoidungCongviecRepositoryServices)
        {
            this.congViecRepositoryServices = congViecRepositoryServices;
            this.binhLuanRepositoryServices = binhLuanRepositoryServices;
            this.nguoidungCongviecRepositoryServices = nguoidungCongviecRepositoryServices;
        }

        public async Task<CongViecResponse?> FindByIdAsync(int maCongviec)
        {
            Congviec congviec = await congViecRepositoryServices.FindByIdAsync(maCongviec);
            List<NguoidungCongviec> nguoidungCongviecs = congviec.NguoidungCongviecs.ToList();
            List<string> nguoiDungs = new List<string>();
            foreach(NguoidungCongviec nguoidungCongviec in nguoidungCongviecs)
            {
                Nguoidung nguoidung = (await nguoidungCongviecRepositoryServices.FindByIdAsync(nguoidungCongviec.Id)).ManguoidungNavigation;
                nguoiDungs.Add(nguoidung.Hoten);
            }
            List<Binhluan> binhLuans = await binhLuanRepositoryServices.FindByMaCongViecAsync(maCongviec);
            List<BinhluanResponse> binhluanResponses = new List<BinhluanResponse>();
            foreach(Binhluan binhluan in binhLuans)
            {
                BinhluanResponse BinhluanResponse = new BinhluanResponse
                {
                    MaBinhLuan = binhluan.Mabinhluan,
                    Macongviec = binhluan.Macongviec.ToString(),
                    Manguoidung = binhluan.Manguoidung.ToString(),
                    Noidung = binhluan.Noidung,
                    Thoigian = binhluan.Thoigian

                };
                binhluanResponses.Add(BinhluanResponse);
            }
            CongViecResponse congViecResponse = new CongViecResponse
            {
                Macongviec = congviec.Macongviec,
                TenCv = congviec.TenCv,
                SonguoithamgiaCv = congviec.SonguoithamgiaCv,
                NgaybatdauCv = congviec.NgaybatdauCv,
                NgayketthucCv = congviec.NgayketthucCv,
                TinhtrangCv = congviec.TinhtrangCv,
                MotaCv = congviec.MotaCv,
                Filename = congviec.Filename,
                Douutien = congviec.Douutien,
                Binhluans = binhluanResponses,
                NguoiDungs = string.Join(", ", nguoiDungs)

            };
            return congViecResponse;
        }
        public async Task<List<Congviec>> FindAllAsync(int top, int skip, string? filter)
        {
            return await congViecRepositoryServices.FindAllAsync(top, skip, filter);
        }
        public async Task<PostDto> AddCongviec(CongViecRequest congviecRequest)
        {
            PostDto result = new PostDto();
            try
            {
                Congviec Congviec = new Congviec
                {
                    TenCv = congviecRequest.TenCv,
                    NgaybatdauCv = congviecRequest.NgaybatdauCv,
                    NgayketthucCv = congviecRequest.NgayketthucCv,
                    TinhtrangCv = congviecRequest.TinhtrangCv,
                    MotaCv = congviecRequest.MotaCv,
                    Filename = congviecRequest.Filename,
                    Douutien = congviecRequest.Douutien,
                    Maduan = congviecRequest.Maduan

                };
                result = await congViecRepositoryServices.AddCongviec(Congviec);
                return result;
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<PostDto> UpdateCongviec(CongViecRequest congViecRequest)
        {
            Congviec congViec = new Congviec
            {
                Macongviec = congViecRequest.MaCongViec,
                TinhtrangCv = congViecRequest.TinhtrangCv
            };
            return await congViecRepositoryServices.UpdateCongviec(congViec);
        }
    }
}
