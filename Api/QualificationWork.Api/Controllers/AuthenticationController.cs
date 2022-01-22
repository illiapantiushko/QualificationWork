using QualificationWork.BL.Services;
using QualificationWork.DTO.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace QualificationWork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthenticationService authenticationService;

        public AuthenticationController(AuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] GoogleAuth model)
        {
            var response = await authenticationService.Authenticate(model.googleToken, ipAddress());
            return Ok(response);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest model)
        {
            var response = await authenticationService.RefreshToken(model.RefreshToken, ipAddress());
            return Ok(response);
        }

        private string ipAddress()
        {  
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
            {
                return Request.Headers["X-Forwarded-For"];
            }
            else
            {
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
            }
        }

        public class GoogleAuth
        {
            public string googleToken { get; set; }
        }

        public class RefreshTokenRequest
        {
            public string RefreshToken { get; set; }
        }
    }
}
