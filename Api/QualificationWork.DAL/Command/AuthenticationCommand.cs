using Microsoft.Extensions.Options;
using QualificationWork.DAL.HelperServise;
using QualificationWork.DAL.Models;
using System;
using System.Threading.Tasks;
using System.Linq;
using QualificationWork.Middleware;
using QualificationWork.DTO.Dtos;
using System.Collections.Generic;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using System.Data.Entity;

namespace QualificationWork.DAL.Command
{
    public class AuthenticationCommand
    {
        private readonly ApplicationContext context;

        private readonly JwtUtils jwtUtils;

        private readonly AppSettings appSettings;

        private readonly UserManager<ApplicationUser> userManager;

        public AuthenticationCommand(
                ApplicationContext context,
                JwtUtils jwtUtils,
                IOptions<AppSettings> appSettings,
                UserManager<ApplicationUser> userManager
            )
        {
            this.context = context;
            this.jwtUtils = jwtUtils;
            this.appSettings = appSettings.Value;
            this.userManager = userManager;

        }

        public async Task<AuthenticateResponseDto> Authenticate(string accessToken, string ipAddress)
        {
            var payload = GoogleJsonWebSignature.ValidateAsync(accessToken, new GoogleJsonWebSignature.ValidationSettings()).Result;

            string domenOA = "@oa.edu.ua";

            bool ValidationEmail = payload.Email.EndsWith(domenOA);

            if (!ValidationEmail)
            {
                throw new AppException("The system only accepts training mail!");
            }

            var user = await userManager.FindByEmailAsync(payload.Email);

            if (user == null)
            {
                ApplicationUser userData = new ApplicationUser
                {
                    Email = payload.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = payload.GivenName,
                    Age = 18
                };
                await userManager.CreateAsync(userData);
            }

            // первірка на емайл адміна
            string AdminEmail = "illia.pantiushko@oa.edu.ua";

            if (AdminEmail == payload.Email)
            {
                await userManager.AddToRolesAsync(user, new List<string>() { UserRoles.Admin });
            }

            if (user.ProfilePicture == null)
            {
                user.ProfilePicture = payload.Picture;
            }

            var roles = await userManager.GetRolesAsync(user);

            var jwtToken = await jwtUtils.GenerateJwtToken(user);

            var refreshToken = jwtUtils.GenerateRefreshToken(ipAddress);

            user.RefreshTokens.Add(refreshToken);

            //remove old refresh tokens from user
            RemoveOldRefreshTokens(user);

            context.Update(user);

            return new AuthenticateResponseDto(user.UserName, jwtToken, refreshToken.Token, roles);
        }

        public async Task<AuthenticateResponseDto> RefreshToken(string token, string ipAddress)
        {
            var user = GetUserByRefreshToken(token);

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            if (refreshToken.IsRevoked)
            {
                RevokeDescendantRefreshTokens(refreshToken, user, ipAddress, $"Attempted reuse of revoked ancestor token: {token}");
                context.Update(user);
            }

            if (!refreshToken.IsActive)
            {
                throw new AppException("Invalid token");
            }

            var newRefreshToken = RotateRefreshToken(refreshToken, ipAddress);

            user.RefreshTokens.Add(newRefreshToken);

            RemoveOldRefreshTokens(user);

            var roles = await userManager.GetRolesAsync(user);

            context.Update(user);

            var jwtToken = await jwtUtils.GenerateJwtToken(user);

            return new AuthenticateResponseDto(user.UserName, jwtToken, newRefreshToken.Token, roles);
        }

        private void RemoveOldRefreshTokens(ApplicationUser user)
        {
            user.RefreshTokens.RemoveAll(x =>
                !x.IsActive &&
                x.Created.AddDays(appSettings.RefreshTokenTTL) <= DateTime.UtcNow);
        }

        private void RevokeDescendantRefreshTokens(RefreshToken refreshToken, ApplicationUser user, string ipAddress, string reason)
        {

            if (!string.IsNullOrEmpty(refreshToken.ReplacedByToken))
            {
                var childToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken.ReplacedByToken);

                if (childToken.IsActive)
                {
                    RevokeRefreshToken(childToken, ipAddress, reason);
                }
                else
                {
                    RevokeDescendantRefreshTokens(childToken, user, ipAddress, reason);
                }
            }
        }

        private ApplicationUser GetUserByRefreshToken(string token)
        {
            var user = context.Users.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null)
            {
                throw new AppException("Invalid token");
            }
            return user;
        }

        private void RevokeRefreshToken(RefreshToken token, string ipAddress, string reason = null, string replacedByToken = null)
        {
            token.Revoked = DateTime.UtcNow;
            token.RevokedByIp = ipAddress;
            token.ReasonRevoked = reason;
            token.ReplacedByToken = replacedByToken;
        }

        private RefreshToken RotateRefreshToken(RefreshToken refreshToken, string ipAddress)
        {
            var newRefreshToken = jwtUtils.GenerateRefreshToken(ipAddress);

            RevokeRefreshToken(refreshToken, ipAddress, "Replaced by new token", newRefreshToken.Token);

            return newRefreshToken;
        }

    }
}
