using Backend.Models;
using Backend.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.RepositoryServices
{
    public class NguoiDungDuAnRepository : BaseRepositoryServices<NguoidungDuan>
    {
        public NguoiDungDuAnRepository(CnttContext context) : base(context)
        {

        }

        public async Task<NguoidungDuan?> FindByIdAsync(int id)
        {
            return await _context.NguoidungDuans.Include(duan => duan.ManguoidungNavigation).FirstOrDefaultAsync(diemDanh => diemDanh.Id == id);
        }

        public async Task<List<NguoidungDuan>> FindByMaNguoiDungAsync(int maNguoiDung)
        {
            return await _context.NguoidungDuans
                .Where(diemDanh => diemDanh.Manguoidung == maNguoiDung)
                .Include(duan => duan.MaduanNavigation)
                .Include(duan => duan.ManguoidungNavigation)
                .ToListAsync();
        }




        public async Task<PostDto> AddNguoiDungDuAn(NguoidungDuan NguoidungDuan)
        {
            PostDto result = new PostDto();
            try
            {
                result.Success = 1;
                await _context.NguoidungDuans.AddAsync(NguoidungDuan);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<PostDto> UpdateNguoiDungDuAn(NguoidungDuan NguoidungDuan)
        {
            PostDto result = new PostDto();

            try
            {
                result.Success = 1;
                await UpdateAsync(NguoidungDuan);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task DeleteAsync(NguoidungDuan NguoidungDuan)
        {
            _context.Set<NguoidungDuan>().Remove(NguoidungDuan);
            await _context.SaveChangesAsync();
        }

        public async Task<List<NguoidungDuan>> FindAllAsync(int top, int skip, string? filter)
        {
            return await AddSkipQuery(AddTopQuery(_context.Set<NguoidungDuan>().AsNoTracking()
                                           .AsQueryable(), top), skip).ToListAsync();
        }


        private IQueryable<NguoidungDuan> AddTopQuery(IQueryable<NguoidungDuan> query, int top)
        {
            return top > 0 ? query.Take(top) : query;
        }

        private IQueryable<NguoidungDuan> AddSkipQuery(IQueryable<NguoidungDuan> query, int skip)
        {
            return skip > 0 ? query.Skip(skip) : query;
        }
    }
}
