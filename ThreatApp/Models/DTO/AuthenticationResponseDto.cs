namespace ThreatApp.Models.DTO;

public class AuthenticationResponseDto
{
    public bool IsSuccessful { get; set; }
    public string? ErrorMessage { get; set; }
    public string? Token { get; set; }
}