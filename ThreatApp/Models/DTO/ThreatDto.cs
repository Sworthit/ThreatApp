using System.ComponentModel.DataAnnotations;
using ThreatApp.Models.Enums;

namespace ThreatApp.Models.DTO;

public class ThreatDto
{
    [Required(ErrorMessage ="Latitude is required")]
    public string Latitude { get; set; }
    [Required(ErrorMessage ="Longtitude is required")]
    public string Longtitude { get; set; }
    [Required(ErrorMessage ="Description is required")]
    public string Description { get; set; }
    [Required(ErrorMessage ="Level is required")]
    public ThreatLevel Level { get; set; }
}