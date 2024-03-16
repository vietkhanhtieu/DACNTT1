using AutoMapper;
using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;

namespace Backend.Services.ExternalServices
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ChamCongRequest, Dulieudiemdanh>();
            CreateMap<NguoiDungRequest, Nguoidung>();
            CreateMap<LuongRequest, Luong>();
            CreateMap<OTRequest, Dangkiot>();
            CreateMap<NghiPhepRequest, Nghiphep>();
            CreateMap<NghiPhepRequest, Nghiphep>();
            CreateMap<Nguoidung, NguoiDungResponse>();

        }
    }
}
