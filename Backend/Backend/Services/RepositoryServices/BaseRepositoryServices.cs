using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.RepositoryServices
{
    public class BaseRepositoryServices<T> where T : BaseModel
    {

        public readonly CnttContext _context;

        public BaseRepositoryServices(CnttContext context)
        {
            _context = context;
        }

        public async Task<T?> FindAsync(int? id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<List<T>> FindAllAsync(int top, int skip, string? filter)
        {
            return await AddSkipQuery(AddTopQuery(
                _context.Set<T>().AsNoTracking(), top), skip)
                .ToListAsync();
        }

        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                _context.ChangeTracker.Clear();
                throw new Exception(ex.ToString());
            }
        }

        public async Task UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                _context.ChangeTracker.Clear();
                throw new Exception(ex.ToString());
            }
        }

        public async Task DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                _context.ChangeTracker.Clear();
                throw new Exception(ex.ToString());
            }
        }

        private IQueryable<T> AddTopQuery(IQueryable<T> query, int top)
        {
            return top > 0 ? query.Take(top) : query;
        }

        private IQueryable<T> AddSkipQuery(IQueryable<T> query, int skip)
        {
            return skip > 0 ? query.Skip(skip) : query;
        }
    }
}
