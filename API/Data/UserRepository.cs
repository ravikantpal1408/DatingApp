using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository(DataContext context, IMapper mapper) : IUserRepository
    {

        public async Task<MemberDTO?> GetMembersAsync(string username)
        {
            return await context.AppUsers
                    .Where(x => x.UserName == username)
                    .ProjectTo<MemberDTO>(mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDTO>> GetMembersAsync()
        {
            return await context.AppUsers.ProjectTo<MemberDTO>(mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<AppUser?> GetUserByUsernameAsync(string username)
        {
            return await context.AppUsers
                .Include(x => x.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await context.AppUsers
                .Include(x => x.Photos)
                .ToListAsync();
        }

        public async Task<AppUser?> GetUserUserByIdAsync(int id)
        {
            return await context.AppUsers
                .FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            context.Entry(user).State = EntityState.Modified;
        }
    }
}