using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Services.RepositoryServices;
using System.Collections.Generic;

namespace Backend.Services.BussinessServices
{
    public class NguoiDungDuAnServices
    {
        private readonly NguoiDungDuAnRepository dungDuAnRepository;
        private readonly NguoiDungRepositoryServices _nguoiDungRepositoryServices;
        private readonly DuAnRepositoryServices _duAnRepositoryServices;



        public NguoiDungDuAnServices(NguoiDungDuAnRepository dungDuAnRepository, NguoiDungRepositoryServices nguoiDungRepositoryServices, DuAnRepositoryServices duAnRepositoryServices)
        {
            this.dungDuAnRepository = dungDuAnRepository;
            _nguoiDungRepositoryServices = nguoiDungRepositoryServices;
            _duAnRepositoryServices = duAnRepositoryServices;
        }

        public async Task<NguoidungDuan?> FindByIdAsync(int id) 
        {
            return await dungDuAnRepository.FindByIdAsync(id);
        }

        public async Task<List<NguoidungDuan>> FindAllAsync(int top, int skip, string? filter)
        {
            return await dungDuAnRepository.FindAllAsync(top, skip, filter);
        }

        public async Task<List<NguoiDungDuAnResponse>> FindByMaNguoiDungAsync(int maNguoiDung)
        {
            List<NguoidungDuan> nguoidungDuans = await dungDuAnRepository.FindByMaNguoiDungAsync(maNguoiDung);
            List<NguoiDungDuAnResponse> nguoiDungDuAnResponses = new List<NguoiDungDuAnResponse>();
            List<string> strings = new List<string>();
            foreach(NguoidungDuan nguoidungDuan  in nguoidungDuans)
            {
                NguoiDungDuAnResponse nguoiDungDuAnResponse = new NguoiDungDuAnResponse
                {
                    MaDuAn = nguoidungDuan.Maduan.ToString(),
                    TenDuAn = nguoidungDuan.MaduanNavigation.TenDa

                };
                nguoiDungDuAnResponses.Add(nguoiDungDuAnResponse);
            }
            return nguoiDungDuAnResponses;
        }

        public async Task<PostDto> AddNguoiDungDuAn(NguoidungDuanRequest nguoidungDuanRequest)
        {
            PostDto result = new PostDto();
            Nguoidung nguoidung = await _nguoiDungRepositoryServices.FindByIdAsync(nguoidungDuanRequest.Manguoidung);
            if (nguoidung == null)
            {
                result.Success = 0;
                result.Message = "Không tìm thấy người dùng";
                return result;
            }
            try
            {
                NguoidungDuan nguoidungDuan = new NguoidungDuan
                {
                    Manguoidung = nguoidungDuanRequest.Manguoidung,
                    Maduan = nguoidungDuanRequest.Maduan
                };
                result = await dungDuAnRepository.AddNguoiDungDuAn(nguoidungDuan);
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
