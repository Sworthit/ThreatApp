using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThreatApp.Database;
using ThreatApp.Models;
using ThreatApp.Models.DTO;

namespace ThreatApp.Controllers.api;

[Route("api/threats")]
public class ThreatsController : ControllerBase
{
    private readonly ThreatDbContext _context;
    private readonly IMapper _mapper;

    public ThreatsController(ThreatDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
        var threats = _context.Threats.ToList();

        return Ok(threats);
    }

    [HttpGet("{id}")]
    public IActionResult GetThreat([FromRoute] int id)
    {
        var threat = _context.Threats.Find(id);

        if (threat == null)
            return BadRequest();

        return Ok(threat);
    }

    [HttpPost("add")]
    public async Task<IActionResult> Add([FromBody]ThreatDto threat)
    {
        if (threat == null || !ModelState.IsValid)
            return BadRequest();

        var threatMapped = _mapper.Map<Threat>(threat);

        _context.Add(threatMapped);

        _context.SaveChanges();
        
        return Ok(threatMapped);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult DeleteThreat([FromRoute] int id)
    {
        var threat = _context.Threats.Find(id);
        if (threat == null)
            return BadRequest("No such threat");

        _context.Threats.Remove(threat);

        _context.SaveChangesAsync();

        return Ok(threat);
    }
}