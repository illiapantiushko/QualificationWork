using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace QualificationWork.ClaimsExtension
{
   static public class ClaimsExtension
    {
        /// <summary>
        /// Gets email of current user from claims
        /// </summary>
        /// <param name="claims">User claims</param>
        static public string GetEmailFromClaims(this IEnumerable<Claim> claims)
        {
            return claims.FirstOrDefault(c => c.Type == ClaimTypes.Email).Value;
        }

        /// <summary>
        /// Gets email of current user from claims
        /// </summary>
        /// <param name="claimsPrincipal">Claims principal instance.</param>
        static public string GetUserEmail(this ClaimsPrincipal claimsPrincipal)
        {
            var claims = claimsPrincipal.Claims;
            return claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Email).Value;
        }
        /// <summary>
        /// Gets ID of current user from claims
        /// </summary>
        /// <param name="claimsPrincipal">Claims principal instance.</param>
        static public long GetUserId(this ClaimsPrincipal claimsPrincipal)
        {
            var claims = claimsPrincipal.Claims;
            return long.Parse(claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier).Value);
        }

        static public List<string> GetUserRoles(this ClaimsPrincipal claimsPrincipal)
        {
            var claims = claimsPrincipal.Claims;
            return claims.Where(claims => claims.Type == ClaimTypes.Role)
                         .Select(claim => claim.Value)
                         .ToList();
        }
    }
}
