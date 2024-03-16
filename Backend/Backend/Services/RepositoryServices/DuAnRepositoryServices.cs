using Backend.Models;
using Backend.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.RepositoryServices
{
    public class DuAnRepositoryServices : BaseRepositoryServices<Duan>
    {
        public DuAnRepositoryServices(CnttContext context) : base(context)
        {
        }

        public async Task<Duan?> FindByIdAsync(int maDuAn)
        {
            return (await _context.Set<Duan>()
                .Include(Duan => Duan.NguoidungDuans)
                .Include(cv => cv.Congviecs)
                .AsQueryable().SingleOrDefaultAsync(Duan => Duan.Maduan == maDuAn));
        }

        public async Task<List<Duan>> FindAll(int top, int skip, string? filter)
        {
            return await FindAllAsync(top, skip, filter);
        }

        public async Task<PostDto> AddDuAn(Duan duAn)
        {
            try
            {
                await AddAsync(duAn);
                return new PostDto
                {
                    Success = 1,
                    Id = duAn.Maduan.ToString(),
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
    }
    
}
