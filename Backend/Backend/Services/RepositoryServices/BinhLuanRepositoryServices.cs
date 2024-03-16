using Backend.Models;
using Backend.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.RepositoryServices
{
    public class BinhLuanRepositoryServices : BaseRepositoryServices<Binhluan>
    {
        public BinhLuanRepositoryServices(CnttContext context) : base(context)
        { 
        }
        public async Task<Binhluan?> FindByIdAsync(int id)
        {
            return await _context.Binhluans.FirstOrDefaultAsync(binhLuan => binhLuan.Mabinhluan == id);
        }

        public async Task<List<Binhluan>> FindByMaCongViecAsync(int maCongViec)
        {
            return await _context.Binhluans
                .Where(diemDanh => diemDanh.Macongviec == maCongViec)
                //.Include(duan => duan.MacongviecNavigation)
                .ToListAsync();
        }




        public async Task<PostDto> AddBinhluan(Binhluan Binhluan)
        {
            PostDto result = new PostDto();
            try
            {
                result.Success = 1;
                await _context.Binhluans.AddAsync(Binhluan);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<PostDto> UpdateBinhluan(Binhluan Binhluan)
        {
            PostDto result = new PostDto();

            try
            {
                result.Success = 1;
                await UpdateAsync(Binhluan);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task DeleteAsync(Binhluan Binhluan)
        {
            _context.Set<Binhluan>().Remove(Binhluan);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Binhluan>> FindAllAsync(int top, int skip, string? filter)
        {
            return await AddSkipQuery(AddTopQuery(_context.Set<Binhluan>().AsNoTracking()
                                           .AsQueryable(), top), skip).ToListAsync();
        }


        private IQueryable<Binhluan> AddTopQuery(IQueryable<Binhluan> query, int top)
        {
            return top > 0 ? query.Take(top) : query;
        }

        private IQueryable<Binhluan> AddSkipQuery(IQueryable<Binhluan> query, int skip)
        {
            return skip > 0 ? query.Skip(skip) : query;
        }
    }
}
