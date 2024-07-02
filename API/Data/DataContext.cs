using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

// below is the feature of c#-12 which is primary constructor 
public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> AppUsers { get; set; }
}
