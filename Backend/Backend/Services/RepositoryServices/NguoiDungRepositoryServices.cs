using Backend.Models;
using Backend.Models.Dtos;
using Backend.Request;
using Backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.RepositoryServices
{
    public class NguoiDungRepositoryServices : BaseRepositoryServices<Nguoidung>
    {
        public NguoiDungRepositoryServices(CnttContext context) : base(context)
        {

        }

        public async Task<Nguoidung?> FindByIdAsync(int maNguoiDung)
        {
            return await _context.Nguoidungs.AsNoTracking().FirstOrDefaultAsync(nguoiDung => nguoiDung.Manguoidung == maNguoiDung);
        }

        public async Task<Nguoidung?> FindByEmailAsync(string emailCty)
        {
            return await _context.Nguoidungs.FirstOrDefaultAsync(nguoiDung => nguoiDung.Emailcongty == emailCty);
        }

        public async Task<List<Nguoidung>> FindAllAsync(int top, int skip, string? filter)
        {
            return await AddSkipQuery(AddTopQuery(_context.Set<Nguoidung>().AsNoTracking()
                                                          .AsQueryable(), top), skip).ToListAsync();
        }

        public async Task<PostDto> AddNguoiDung(Nguoidung nguoidung)
        {
            PostDto result = new PostDto();
            try
            {
                result.Success = 1;
                await _context.Nguoidungs.AddAsync(nguoidung);
                await _context.SaveChangesAsync();
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
            _context.Set<Nguoidung>().Remove(nguoidung);
            await _context.SaveChangesAsync();
        }

        public async Task<PostDto> UpdateAsync(Nguoidung nguoidung)
        {
            PostDto result = new PostDto();
            Nguoidung oldNguoiDung = await FindByIdAsync(nguoidung.Manguoidung);
            try
            {
                result.Success = 1;
                oldNguoiDung = NguoiDungUtils.UpdateNguoiDung(oldNguoiDung, nguoidung);
                _context.Set<Nguoidung>().Update(oldNguoiDung);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }

        
        private IQueryable<Nguoidung> AddTopQuery(IQueryable<Nguoidung> query, int top)
        {
            return top > 0 ? query.Take(top) : query;
        }

        private IQueryable<Nguoidung> AddSkipQuery(IQueryable<Nguoidung> query, int skip)
        {
            return skip > 0 ? query.Skip(skip) : query;
        }
    }
    
}
