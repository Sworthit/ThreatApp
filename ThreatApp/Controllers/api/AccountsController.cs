using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ThreatApp.Jwt;
using ThreatApp.Models;
using ThreatApp.Models.DTO;

namespace ThreatApp.Controllers.api;

[Route("api/accounts")]
public class AccountsController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;
    private readonly JwtHandler _handler;
    
    public AccountsController(UserManager<User> userManager, IMapper mapper, JwtHandler handler)
    {
        _userManager = userManager;
        _mapper = mapper;
        _handler = handler;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] UserRegisteredDto userRegistered)
    {
        if (userRegistered == null || !ModelState.IsValid)
            return BadRequest();

        var user = _mapper.Map<User>(userRegistered);

        var result = await _userManager.CreateAsync(user, userRegistered.Password);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description);

            return BadRequest(new RegistrationResponseDto { Errors = errors });
        }

        await _userManager.AddToRoleAsync(user, "Viewer");
        return StatusCode(201);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthenticatedUserDto authenticatedUserDto)
    {
        var user = await _userManager.FindByNameAsync(authenticatedUserDto.Email);

        if (user == null || !await _userManager.CheckPasswordAsync(user, authenticatedUserDto.Password))
            return Unauthorized(new AuthenticationResponseDto { ErrorMessage = "Invalid authentication" });

        var signingCredentials = _handler.GetCredentials();
        var claims =  await _handler.GetClaims(user);
        var tokenOptions = _handler.GenerateTokenOptions(signingCredentials, claims);
        var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        return Ok(new AuthenticationResponseDto { IsSuccessful = true, Token = token });
    }
}