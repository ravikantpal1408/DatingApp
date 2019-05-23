using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T: class; // Add T- type of user or type of user 
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> User(int id);

    }
}