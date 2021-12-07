using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QualificationWork.BL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService userService;

        public UsersController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("addRole")]
        public async Task<ActionResult> AddRole(string userId, string roleName)
        {
            await userService.AddRoleAsync(userId,roleName);
            return Ok();
        }

        [HttpPost("deleteRole")]
        public async Task<ActionResult> DeleteRole(string userId, string roleName)
        {
            await userService.DeleteRolesAsync(userId,roleName);
            return Ok();
        }

        [HttpPost("createUser")]
        public async Task<ActionResult> СreateUser(string userName, string userEmail)
        {
          
            await userService.СreateUserAsync(userName, userEmail);
            return Ok();
        }

        [HttpPost("addSubject")]
        public async Task<ActionResult> AddSubject(long userId, long subjectId)
        {

            await userService.AddSubject(userId, subjectId);
            return Ok();
        }

        [HttpPost("addGroup")]
        public async Task<ActionResult> AddGroup(long userId, long groupId)
        {
            
            await userService.AddGroup(userId, groupId);
            return Ok();
        }

        [HttpDelete("removeSubject")]
        public ActionResult RemoveSubject(long userId, long subjectId)
        {

            userService.RemoveSubject(userId, subjectId);
            return Ok();
        }

       
    }
}
