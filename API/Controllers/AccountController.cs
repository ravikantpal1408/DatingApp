using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
    [AllowAnonymous]
    [HttpPost("register")] //account/register
    public async Task<ActionResult<AppUser>> Register(RegisterDTO registerDTO)
    {
        if (await UserExists(registerDTO.UserName)) return BadRequest("Username already exists...");

        using var hmac = new HMACSHA512();
        var user = new AppUser
        {
            UserName = registerDTO.UserName.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
            PasswordSalt = hmac.Key
        };

        context.AppUsers.Add(user);
        await context.SaveChangesAsync();
        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUser>> Login(LoginDTO loginDTO) //account/login
    {
        var user = await context.AppUsers.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDTO.UserName.ToLower());
        if (user == null) return Unauthorized("Invalid username");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("un-authorised access");
        }

        var accessToken = new UserDTO
        {
            Username = loginDTO.UserName,
            Token = tokenService.CreateToken(user),
        };
        return Ok(accessToken);
    }


    private async Task<bool> UserExists(string username)
    {
        return await context.AppUsers.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }

}
