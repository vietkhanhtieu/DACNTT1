using AutoMapper;
using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Services.RepositoryServices;
using System.ComponentModel.DataAnnotations;

namespace Backend.Services.BussinessServices
{
    public class NguoiDungServices
    {
        private readonly NguoiDungRepositoryServices _nguoiDungRepositoryServices;
        public readonly IMapper _mapper;

        public NguoiDungServices(NguoiDungRepositoryServices nguoiDungRepositoryServices, IMapper mapper )
        {
            _nguoiDungRepositoryServices = nguoiDungRepositoryServices;
            _mapper = mapper;
        }

        public async Task<Nguoidung?> FindByIdAsync(int maNguoiDung)
        {
            return await _nguoiDungRepositoryServices.FindByIdAsync(maNguoiDung);
        }

        public async Task<Nguoidung?> FindByEmailAsync(string email)
        {
            return await _nguoiDungRepositoryServices.FindByEmailAsync(email);
        }

        public async Task<List<NguoiDungResponse>> FindAllAsync(int top, int skip, string? filter)
        {
            List<Nguoidung> nguoidungs = await _nguoiDungRepositoryServices.FindAllAsync(top, skip, filter);
            List<NguoiDungResponse> nguoiDungResponses = _mapper.Map<List<NguoiDungResponse>>(nguoidungs);
            return nguoiDungResponses;
        }

        public async Task<PostDto> AddNguoiDung(NguoiDungRequest nguoiDungRequest)
        {
            PostDto result = new PostDto();
            try
            {
                Nguoidung nguoiDung = await FindByEmailAsync(nguoiDungRequest.Emailcongty);
                if(nguoiDung != null)
                {
                    result.Success = 0;
                    result.Message = "Email đã tồn tại";
                    return result;
                }

                Nguoidung nguoidung = _mapper.Map<Nguoidung>(nguoiDungRequest);
                result = await _nguoiDungRepositoryServices.AddNguoiDung(nguoidung);
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<PostDto> UpdateNguoiDung(NguoiDungRequest nguoiDungRequest)
        {
            PostDto result = new PostDto();
            try
            {
                nguoiDungRequest.Validate();
                Nguoidung nguoiDung = await FindByIdAsync(nguoiDungRequest.Manguoidung);
                if (nguoiDung == null)
                {
                    result.Success = 0;
                    result.Message = "Mã người dùng đã tồn tại";
                    return result;
                }

                Nguoidung nguoidung = _mapper.Map<Nguoidung>(nguoiDungRequest);
                result = await _nguoiDungRepositoryServices.UpdateAsync(nguoidung);
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task DeleteAsync(Nguoidung nguoidung)
        {
            await _nguoiDungRepositoryServices.DeleteAsync(nguoidung);
        }


        public async Task<PostDto> Login(LoginRequest loginRequest) {            
            PostDto result = new PostDto();
            try
            {
                Nguoidung nguoidung = await FindByEmailAsync(loginRequest.Email);
                if (nguoidung == null)
                {
                    result.Success = 0;
                    result.Message = "Email không tồn tại";
                }
                else
                {
                    if (nguoidung.Matkhau == loginRequest.Password)
                    {
                        result.Success = 1;
                        result.Message = "Đăng nhập thành công";
                        result.Id = nguoidung.Manguoidung.ToString();
                    }
                    else
                    {
                        result.Success = 0;
                        result.Message = "Mật khẩu không đúng";
                    }
                }
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
