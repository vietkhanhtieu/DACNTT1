using AutoMapper;
using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Services.RepositoryServices;
using Backend.Utils;

namespace Backend.Services.BussinessServices
{
    public class ChamCongServices
    {
        public readonly ChamCongRepositoryServices _chamCongRepositoryServices;
        public readonly IMapper _mapper;

        public ChamCongServices(ChamCongRepositoryServices chamCongRepositoryServices, IMapper mapper)
        {
            _chamCongRepositoryServices = chamCongRepositoryServices;
            _mapper = mapper;
        }

        public Task<Dulieudiemdanh?> FindByIdAsync(int maDiemDanh)
        {
            return _chamCongRepositoryServices.FindByIdAsync(maDiemDanh);
        }

        public Task<Dulieudiemdanh?> FindByDateAsync(int maDiemDanh, string date)
        {
            return _chamCongRepositoryServices.FindByDate(maDiemDanh, date);
        }

        public async Task<List<Dulieudiemdanh>> FindAllAsync(int top, int skip, string? filter)
        {
            return await _chamCongRepositoryServices.FindAllAsync(top, skip, filter);
        }

        public async Task<PostDto> AddChamCong(ChamCongRequest chamCongRequest)
        {
            PostDto result = new PostDto();
            try
            {
                Dulieudiemdanh dulieudiemdanh1 = await _chamCongRepositoryServices.FindByDate(chamCongRequest.Manguoidung, chamCongRequest.Giocheckin.ToString());
                if(dulieudiemdanh1 != null)
                {
                    result.Success = 0;
                    result.Message = "Bạn đã điểm danh hôm nay";
                }
                else
                {
                    Dulieudiemdanh dulieudiemdanh = _mapper.Map<Dulieudiemdanh>(chamCongRequest);
                    result = await _chamCongRepositoryServices.AddChamCong(dulieudiemdanh);
                }
                
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<PostDto> UpdateChamCong(ChamCongRequest chamCongRequest)
        {
            PostDto result = new PostDto();
            try
            {
                Dulieudiemdanh dulieudiemdanh1 = await _chamCongRepositoryServices.FindByDate(chamCongRequest.Manguoidung, chamCongRequest.Giocheckin.ToString());
                Dulieudiemdanh dulieudiemdanh = _mapper.Map<Dulieudiemdanh>(chamCongRequest);
                dulieudiemdanh1 = ChamCongUtils.UpdateDuLieuDiemDanh(dulieudiemdanh1, dulieudiemdanh);
                result = await _chamCongRepositoryServices.UpdateChamCong(dulieudiemdanh1);
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message=ex.Message;
            }
            return result;
        }

        public async Task DeleteAsync(Dulieudiemdanh dulieudiemdanh)
        {
            await _chamCongRepositoryServices.DeleteAsync(dulieudiemdanh);
        }

        public async Task<List<Dulieudiemdanh>> FindByDateRange(int maNguoiDung, string startRequest, string endRequest)
        {
            return await _chamCongRepositoryServices.FindByDateRange(maNguoiDung, startRequest,endRequest);
        }
    }
}
