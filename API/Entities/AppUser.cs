namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string UserName { get; set; } // this is the feature of c# 12
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}
