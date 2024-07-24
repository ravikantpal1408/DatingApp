using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController(IUserRepository userRepository) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
    {
        var users = await userRepository.GetMembersAsync();

        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        var user = await userRepository.GetUserUserByIdAsync(id);

        if (user == null) return NotFound();

        return Ok(user);
    }

    [HttpGet("{username:string}")]
    public async Task<ActionResult<AppUser>> GetUser(string username)
    {
        var user = await userRepository.GetMembersAsync(username);

        if (user == null) return NotFound();

        return Ok(user);
    }
}
