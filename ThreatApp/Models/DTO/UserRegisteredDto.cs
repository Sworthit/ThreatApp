using System.ComponentModel.DataAnnotations;

namespace ThreatApp.Models.DTO;

public class UserRegisteredDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; set; }
    [Required(ErrorMessage = "Please enter password")]
    public string? Password { get; set; }
    [Required(ErrorMessage = "Passwords do not match!")]
    public string? ConfirmPassword { get; set; }
}