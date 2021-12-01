using QualificationWork.DAL;
using QualificationWork.DAL.Command;
using QualificationWork.DTO.Dtos;
using System.Threading.Tasks;

namespace QualificationWork.BL.Services
{
   public class AuthenticationService
    {
        private readonly AuthenticationCommand authenticationCommand;
        private readonly ApplicationContext context;

        public AuthenticationService(AuthenticationCommand authenticationCommand,  ApplicationContext context)
        {
        
            this.authenticationCommand = authenticationCommand;
            this.context = context;
        }

        public async Task<AuthenticateResponseDto> Authenticate(string accessToken, string ipAddress)
        {
            var authenticate = await authenticationCommand.Authenticate(accessToken, ipAddress);

            await context.SaveChangesAsync();

            return authenticate;

        }

        public async Task<AuthenticateResponseDto> RefreshToken(string token, string ipAddress)
        {
            var refreshToken = await authenticationCommand.RefreshToken(token, ipAddress);

            await context.SaveChangesAsync();

            return refreshToken;
        }

    }
}
