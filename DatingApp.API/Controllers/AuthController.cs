using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

namespace DatingApp.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _mapper = mapper;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDtoForRegisteration userDto)
        {

            userDto.Username = userDto.Username.ToLower();

            if (await _repo.UserExists(userDto.Username))
            {
                return BadRequest("Username Already exists!!");
            }

            var newUser = _mapper.Map<User>(userDto);
            // new User
            // {
            //     Username = userDto.Username

            // };

            var createdUser = await _repo.RegisterAsync(newUser, userDto.Password);
            var userToReturn = _mapper.Map<UserForDetailDto>(createdUser); 


            // return StatusCode(201);
            return CreatedAtRoute("GetUser", new { controller = "Users", id = createdUser.Id }, userToReturn);

        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            try
            {
                var now = DateTime.UtcNow;

                var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

                if (userFromRepo == null)
                {
                    return Unauthorized();
                }

                var claims = new []
                {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.Username )
                };

                var key = new Microsoft.IdentityModel.Tokens
                    .SymmetricSecurityKey(Encoding.UTF8
                        .GetBytes(_config
                            .GetSection("AppSettings:Token").Value));

                var creds = new Microsoft.IdentityModel.Tokens
                    .SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                var tokenDescriptor = new Microsoft.IdentityModel.Tokens
                    .SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(claims),
                        Expires = DateTime.Now.AddDays(1),
                        SigningCredentials = creds
                    };

                var tokenHandler = new JwtSecurityTokenHandler();

                var token = tokenHandler.CreateToken(tokenDescriptor);

                var user = _mapper.Map<UserForListDto>(userFromRepo);
                
                return Ok(new
                {
                    token = tokenHandler.WriteToken(token),
                    user
                });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }




    }
}