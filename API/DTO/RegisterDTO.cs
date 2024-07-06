using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API;

public class RegisterDTO
{
    [JsonPropertyName("username")]
    [Required]
    public string UserName { get; set; } = string.Empty;

    [Required]
    [JsonPropertyName("password")]
    [StringLength(8, MinimumLength = 4)]
    public string Password { get; set; } = string.Empty;
}
