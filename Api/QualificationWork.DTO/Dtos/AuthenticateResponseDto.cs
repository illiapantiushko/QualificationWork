using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace QualificationWork.DTO.Dtos
{
    public class AuthenticateResponseDto
    {
        public string UserName { get; set; }
        public string JwtToken { get; set; }

        //[JsonIgnore]
        public string RefreshToken { get; set; }

        public IList<string> Roles { get; set; }

        public AuthenticateResponseDto(string userName, string jwtToken, string refreshToken, IList<string> Roles)
        {

            UserName = userName;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
            this.Roles = Roles;
        }
    }
}
