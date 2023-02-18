using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ThreatApp.Models.Enums;

namespace ThreatApp.Models;

public class Threat
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required(ErrorMessage = "Location is a required field")]
    [MaxLength(20)]
    public string? Latitude { get; set; }
    [Required(ErrorMessage = "Location is a required field")]
    [MaxLength(20)]
    public string? Longtitude { get; set; }
    [Required(ErrorMessage = "Description of a threat is required")]
    [MaxLength(60)]
    public string? Description { get; set; }
    [EnumDataType(typeof(ThreatLevel))]
    public ThreatLevel Level { get; set; }
}

