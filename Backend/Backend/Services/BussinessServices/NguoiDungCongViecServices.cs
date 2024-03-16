using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Services.RepositoryServices;

namespace Backend.Services.BussinessServices
{
    public class NguoiDungCongViecServices
    {
        private readonly NguoidungCongviecRepositoryServices _nguoidungCongviecRepositoryServices;
        private readonly NguoiDungRepositoryServices _nguoiDungRepositoryServices;
        private readonly CongViecRepositoryServices _congViecRepositoryServices;

        public NguoiDungCongViecServices(NguoidungCongviecRepositoryServices nguoidungCongviecRepositoryServices, NguoiDungRepositoryServices nguoiDungRepositoryServices, CongViecRepositoryServices congViecRepositoryServices)
        {
            _nguoidungCongviecRepositoryServices = nguoidungCongviecRepositoryServices;
            _nguoiDungRepositoryServices = nguoiDungRepositoryServices;
            _congViecRepositoryServices = congViecRepositoryServices;
        }

        public async Task<NguoidungCongviec?> FindByIdAsync(int id)
        {
            return await _nguoidungCongviecRepositoryServices.FindByIdAsync(id);
        }

        public async Task<List<NguoiDungCongViecResponse>> FindByMaNguoiDungAsync(int maNguoiDung)
        {
            List<NguoidungCongviec> nguoidungCongviecs = await _nguoidungCongviecRepositoryServices.FindByMaNguoiDungAsync(maNguoiDung);
            List<NguoiDungCongViecResponse> nguoiDungCongViecResponses = new List<NguoiDungCongViecResponse>();
            foreach (NguoidungCongviec nguoidungCongviec in nguoidungCongviecs)
            {
                List<string> values = new List<string>();
                Congviec congviec = await _congViecRepositoryServices.FindByIdAsync(nguoidungCongviec.Macongviec);

                NguoiDungCongViecResponse nguoiDungCongViecResponse = new NguoiDungCongViecResponse
                {
                    maCongViec = nguoidungCongviec.Macongviec.ToString(),
                    tenCongViec = nguoidungCongviec.MacongviecNavigation.TenCv,
                    tenDuAn = congviec.MaduanNavigation.TenDa,

                };
                nguoiDungCongViecResponses.Add(nguoiDungCongViecResponse);
            }
            return nguoiDungCongViecResponses;
        }

        public async Task<PostDto> AddNguoiDungCongViec(NguoiDungCongViecRequest nguoiDungCongViecRequest)
        {
            PostDto result = new PostDto();
            Nguoidung nguoidung = await _nguoiDungRepositoryServices.FindByIdAsync(nguoiDungCongViecRequest.Manguoidung);
            if (nguoidung == null)
            {
                result.Success = 0;
                result.Message = "Không tìm thấy người dùng";
                return result;
            }
            try
            {
                //Congviec congviec = new Congviec
                //{
                //    TenCv = nguoiDungCongViecRequest.TenCv,
                //    NgaybatdauCv = nguoiDungCongViecRequest.NgaybatdauCv,
                //    NgayketthucCv = nguoiDungCongViecRequest.NgayketthucCv,
                //    TinhtrangCv = nguoiDungCongViecRequest.TinhtrangCv,
                //    MotaCv = nguoiDungCongViecRequest.MotaCv,
                //    Filename = nguoiDungCongViecRequest.Filename,
                //    Douutien = nguoiDungCongViecRequest.Douutien
                //};
                //PostDto temp = await _congViecRepositoryServices.AddCongviec(congviec);
                NguoidungCongviec nguoidungCongviec = new NguoidungCongviec
                {
                    Manguoidung = nguoiDungCongViecRequest.Manguoidung,
                    Macongviec = nguoiDungCongViecRequest.Macongviec
                };
                result = await _nguoidungCongviecRepositoryServices.AddNguoidungCongviec(nguoidungCongviec);
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
