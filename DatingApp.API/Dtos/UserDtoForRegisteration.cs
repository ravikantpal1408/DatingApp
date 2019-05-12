using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserDtoForRegisteration
    {
        [Required(ErrorMessage="Username is blank")]
        [EmailAddress(ErrorMessage="Not a valid Email")]
        public string Username { get; set; }
        
        
        [Required]
        [MinLength(4, ErrorMessage="Password should be minimum 4 character.")]
        [MaxLength(20, ErrorMessage = "Password cannot be more than 20 characters.")]
        public string Password { get; set; }
    }
}