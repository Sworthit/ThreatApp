using AutoMapper;
using ThreatApp.Models;
using ThreatApp.Models.DTO;

namespace ThreatApp.Mapper;

public class ThreatMapper : Profile
{
    public ThreatMapper()
    {
        CreateMap<ThreatDto, Threat>()
            .ForMember(t => t.Level, opt => opt.MapFrom(td => td.Level));
    }
}