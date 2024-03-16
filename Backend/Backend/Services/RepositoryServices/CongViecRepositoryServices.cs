using Backend.Models;
using Backend.Models.Dtos;
using Backend.Utils;
using Microsoft.EntityFrameworkCore;
using System;

namespace Backend.Services.RepositoryServices
{
    public class CongViecRepositoryServices : BaseRepositoryServices<Congviec>
    {
        public CongViecRepositoryServices(CnttContext context) : base(context)
        {

        }

        public async Task<Congviec?> FindByIdAsync(int id)
        {
            return await _context.Congviecs
                .Include(cv => cv.MaduanNavigation)
                .Include(cv => cv.NguoidungCongviecs)
                .FirstOrDefaultAsync(diemDanh => diemDanh.Macongviec == id);
        }


        public async Task<PostDto> AddCongviec(Congviec Congviec)
        {
            PostDto result = new PostDto();
            try
            {
                await _context.Congviecs.AddAsync(Congviec);
                await _context.SaveChangesAsync();
                result.Success = 1;
                result.Id = Congviec.Macongviec.ToString();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<PostDto> UpdateCongviec(Congviec CongviecRequest)
        {
            PostDto result = new PostDto();
            Congviec oldCv = _context.Congviecs.AsNoTracking().Include(cv => cv.MaduanNavigation).FirstOrDefault(e => e.Macongviec == CongviecRequest.Macongviec);
            try
            {
                oldCv = CongViecUtils.UpdateCongViecUtil(CongviecRequest,oldCv);
                result.Success = 1;
                _context.Congviecs.Update(oldCv);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task DeleteAsync(Congviec Congviec)
        {
            _context.Set<Congviec>().Remove(Congviec);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Congviec>> FindAllAsync(int top, int skip, string? filter)
        {
            return await AddSkipQuery(AddTopQuery(_context.Set<Congviec>().AsNoTracking()
                                           .AsQueryable(), top), skip).ToListAsync();
        }


        private IQueryable<Congviec> AddTopQuery(IQueryable<Congviec> query, int top)
        {
            return top > 0 ? query.Take(top) : query;
        }

        private IQueryable<Congviec> AddSkipQuery(IQueryable<Congviec> query, int skip)
        {
            return skip > 0 ? query.Skip(skip) : query;
        }
    }
}
