using Backend.Models.Dtos;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.RepositoryServices
{
    public class NguoidungCongviecRepositoryServices : BaseRepositoryServices<NguoidungCongviec>
    {
        public NguoidungCongviecRepositoryServices(CnttContext context) : base(context)
        {
        }

        public async Task<NguoidungCongviec?> FindByIdAsync(int id)
        {
            return await _context.NguoidungCongviecs
                .Include(x => x.ManguoidungNavigation)

                .FirstOrDefaultAsync(diemDanh => diemDanh.Id == id);
        }

        public async Task<List<NguoidungCongviec>> FindByMaNguoiDungAsync(int maNguoiDung)
        {
            return await _context.NguoidungCongviecs
                .Where(Congviec => Congviec.Manguoidung == maNguoiDung)
                .Include(duan => duan.MacongviecNavigation)
                .Include(duan => duan.ManguoidungNavigation)

                .ToListAsync();
        }

        public async Task<PostDto> AddNguoidungCongviec(NguoidungCongviec NguoidungCongviec)
        {
            PostDto result = new PostDto();
            try
            {
                await _context.NguoidungCongviecs.AddAsync(NguoidungCongviec);
                await _context.SaveChangesAsync();
                result.Success = 1;
                result.Id = NguoidungCongviec.Id.ToString();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<PostDto> UpdateNguoidungCongviec(NguoidungCongviec NguoidungCongviec)
        {
            PostDto result = new PostDto();

            try
            {
                result.Success = 1;
                await UpdateAsync(NguoidungCongviec);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task DeleteAsync(NguoidungCongviec NguoidungCongviec)
        {
            _context.Set<NguoidungCongviec>().Remove(NguoidungCongviec);
            await _context.SaveChangesAsync();
        }

        public async Task<List<NguoidungCongviec>> FindAllAsync(int top, int skip, string? filter)
        {
            return await AddSkipQuery(AddTopQuery(_context.Set<NguoidungCongviec>().AsNoTracking()
                                           .AsQueryable(), top), skip).ToListAsync();
        }


        private IQueryable<NguoidungCongviec> AddTopQuery(IQueryable<NguoidungCongviec> query, int top)
        {
            return top > 0 ? query.Take(top) : query;
        }

        private IQueryable<NguoidungCongviec> AddSkipQuery(IQueryable<NguoidungCongviec> query, int skip)
        {
            return skip > 0 ? query.Skip(skip) : query;
        }
    }
}
