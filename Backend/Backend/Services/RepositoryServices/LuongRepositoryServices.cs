using Backend.Models;
using Backend.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.RepositoryServices
{
    public class LuongRepositoryServices : BaseRepositoryServices<Luong>
    {
        public LuongRepositoryServices(CnttContext context) : base(context)
        {

        }

        public async Task<Luong?> FindByIdAsync(int maLuong)
        {
            return await _context.Luongs.FirstOrDefaultAsync(luong => luong.Maluong == maLuong);
        }

        public async Task<List<Luong>> FindAllAsync(int top, int skip, string? filter)
        {
            return await AddSkipQuery(AddTopQuery(_context.Set<Luong>().AsNoTracking()
                                                          .AsQueryable(), top), skip).ToListAsync();
        }

        public async Task<Luong?> FindByMonth(int maNguoiDung, int thang, int nam)
        {
            return await _context.Luongs.FirstOrDefaultAsync(luong => luong.Manguoidung == maNguoiDung && luong.Thang == thang && luong.Nam == nam) ;
        }

        public async Task<PostDto> AddLuong(Luong luong)
        {
            PostDto result = new PostDto();
            try
            {
                result.Success = 1;
                await _context.Luongs.AddAsync(luong);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }   

        private IQueryable<Luong> AddTopQuery(IQueryable<Luong> query, int top)
        {
            return top > 0 ? query.Take(top) : query;
        }

        private IQueryable<Luong> AddSkipQuery(IQueryable<Luong> query, int skip)
        {
            return skip > 0 ? query.Skip(skip) : query;
        }

    }
}
