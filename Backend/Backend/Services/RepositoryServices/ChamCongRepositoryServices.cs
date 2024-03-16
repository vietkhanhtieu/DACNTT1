using Backend.Models;
using Backend.Models.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Backend.Services.RepositoryServices
{
    public class ChamCongRepositoryServices : BaseRepositoryServices<Dulieudiemdanh>
    {
        public ChamCongRepositoryServices(CnttContext context) : base(context)
        {

        }

        public async Task<Dulieudiemdanh?> FindByIdAsync(int maDiemDanh)
        {
            return await _context.Dulieudiemdanhs.FirstOrDefaultAsync(diemDanh => diemDanh.Madiemdanh == maDiemDanh);
        }

        
        public async Task<List<Dulieudiemdanh>> FindAllAsync(int top, int skip, string? filter)
        {
            return await AddSkipQuery(AddTopQuery(_context.Set<Dulieudiemdanh>().AsNoTracking()
                                           .AsQueryable(), top), skip).ToListAsync();
        }

        public async Task<List<Dulieudiemdanh>> FindByDateRange(int maNguoiDung, string startRequest, string endRequest)
        {
            DateTime startDate, endDate;
            if (DateTime.TryParse(startRequest, out startDate) && DateTime.TryParse(endRequest, out endDate))
            {
                List<Dulieudiemdanh> list = await _context.Dulieudiemdanhs
                    .Where(diemDanh => diemDanh.Giocheckin.Date >= startDate.Date && diemDanh.Giocheckin.Date <= endDate.Date && diemDanh.Manguoidung == maNguoiDung)
                    .ToListAsync();
                return list;
            }
            else
            {
                return null; // Handle invalid date requests
            }
        }

        public async Task<Dulieudiemdanh> FindByDate(int maNguoiDung, string startRequest)
        {
            DateTime startDate, endDate;
            //Dulieudiemdanh dulieudiemdanh = new Dulieudiemdanh();
            if (DateTime.TryParse(startRequest, out startDate))
            {
                Dulieudiemdanh dulieudiemdanh = await _context.Dulieudiemdanhs.FirstOrDefaultAsync(diemDanh => diemDanh.Giocheckin.Date == startDate.Date && diemDanh.Manguoidung == maNguoiDung);
                return dulieudiemdanh;
            }
            else
            {
                return null;
            }
        }


        public async Task<PostDto> AddChamCong(Dulieudiemdanh dulieudiemdanh)
        {
            PostDto result = new PostDto();
            try
            {
                result.Success = 1;
                await _context.Dulieudiemdanhs.AddAsync(dulieudiemdanh);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<PostDto> UpdateChamCong(Dulieudiemdanh dulieudiemdanh)
        {
            PostDto result = new PostDto();
            
            try
            {
                result.Success = 1;
                await UpdateAsync(dulieudiemdanh);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task DeleteAsync(Dulieudiemdanh dulieudiemdanh)
        {
            _context.Set<Dulieudiemdanh>().Remove(dulieudiemdanh);
            await _context.SaveChangesAsync();
        }
        private IQueryable<Dulieudiemdanh> AddTopQuery(IQueryable<Dulieudiemdanh> query, int top)
        {
            return top > 0 ? query.Take(top) : query;
        }

        private IQueryable<Dulieudiemdanh> AddSkipQuery(IQueryable<Dulieudiemdanh> query, int skip)
        {
            return skip > 0 ? query.Skip(skip) : query;
        }
    }

}
