using System.Text.Json.Serialization;

namespace API;

public class LoginDTO
{
    [JsonPropertyName("username")]
    public required string UserName { get; set; }

    [JsonPropertyName("password")]
    public required string Password { get; set; }

}
