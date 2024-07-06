using API.DTO;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDTO>()
                .ForMember(d => d.Age, o => o.MapFrom(s => s.DateOfBirth.CaculateAge()))
                .ForMember(d => d.PhotoUrl,
                           o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url));
            CreateMap<Photo, PhotoDTO>();
        }
    }
}