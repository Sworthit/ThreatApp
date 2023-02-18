using System.ComponentModel.DataAnnotations;

namespace ThreatApp.Models.DTO;

public class AuthenticatedUserDto
{
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; set; }
    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; set; }
}