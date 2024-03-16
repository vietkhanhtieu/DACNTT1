using Backend.Models;
using Backend.Models.Dtos;
using Backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.RepositoryServices
{
    public class NghiPhepRepositoryServices : BaseRepositoryServices<Nghiphep>
    {
        public NghiPhepRepositoryServices(CnttContext context) : base(context)
        {
        }

        public  async Task<Nghiphep?> FindByIdAsync(int maNghiPhep)
        {
            return await FindAsync(maNghiPhep);
        }

        public async Task<List<Nghiphep>> FindAll(int top, int skip, string? filter)
        {
            return await AddSkipQuery(AddTopQuery(
                _context.Set<Nghiphep>().AsNoTracking(), top), skip).Include(ot => ot.ManguoidungNavigation)
                .ToListAsync();
        }

        public async Task<List<Nghiphep>> FindAllNghiPhepUserAsync(int maNguoiDung)
        {
            return _context.Nghipheps.Where(ot => ot.Manguoidung == maNguoiDung).ToList();
        }

        public async Task<PostDto> AddNghiPhep(Nghiphep nghiPhep)
        {
            try
            {
                await AddAsync(nghiPhep);
                return new PostDto
                {
                    Success = 1,
                };
            }
            catch (Exception ex)
            {
                return new PostDto
                {
                    Success = 0,
                    Message = ex.Message
                };
            }
        }

        public async Task<PostDto> UpdateStatusNghiPhep(Nghiphep nghiPhepRequest)
        {
            PostDto result = new PostDto();
            Nghiphep nghiphep = _context.Nghipheps.AsNoTracking().FirstOrDefault(e => e.Manghiphep == nghiPhepRequest.Manghiphep);
            try
            {
                nghiphep = NghiPhepUtils.UpdateDangNghiPhep(nghiphep, nghiPhepRequest);
                result.Success = 1;
                _context.Nghipheps.Update(nghiphep);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                result.Success = 0;
                result.Message = ex.Message;
            }
            return result;
        }
        private IQueryable<Nghiphep> AddTopQuery(IQueryable<Nghiphep> query, int top)
        {
            return top > 0 ? query.Take(top) : query;
        }

        private IQueryable<Nghiphep> AddSkipQuery(IQueryable<Nghiphep> query, int skip)
        {
            return skip > 0 ? query.Skip(skip) : query;
        }
    }
}
