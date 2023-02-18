using AutoMapper;
using ThreatApp.Models;
using ThreatApp.Models.DTO;

namespace ThreatApp.Mapper;

public class AccountMapper : Profile
{
    public AccountMapper()
    {
        CreateMap<UserRegisteredDto, User>()
            .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
    }
}