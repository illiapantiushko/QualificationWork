using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QualificationWork.BL.Services;
using QualificationWork.ClaimsExtension;
using QualificationWork.DAL.Models;
using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class UsersController : ControllerBase
    {
        private readonly UserService userService;

        public UsersController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("getUsers")]
        public async Task<ActionResult> GetUsers()
        {
            var data = await userService.GetUsers();
            return Ok(data);
        }
        [HttpGet("getTimeTable")]
        public async Task<ActionResult> GetTimeTable()
        {
            var data = await userService.GetTimeTable();
            return Ok(data);
        }

        [HttpPost("addRole")]
        public async Task<ActionResult> AddRole([FromBody] RoleDto model)
        {
            await userService.AddRoleAsync(model.UserId, model.RoleName);
            return Ok();
        }

        [HttpPost("deleteRole")]
        public async Task<ActionResult> DeleteRole([FromBody] RoleDto model)
        {
            await userService.DeleteRolesAsync(model.UserId, model.RoleName);
            return Ok();
        }

        [HttpPost("createUser")]
        public async Task<ActionResult> СreateUser([FromBody] UserDto model)
        {
            await userService.СreateUserAsync(model);
            return Ok();
        }

        [HttpPost("addSubject")]
        public async Task<ActionResult> AddSubject([FromBody] UserSubjectDto model)
        {

            await userService.AddSubject(model.UserId, model.SubjectId);
            return Ok();
        }

        [HttpPost("addGroup")]
        public async Task<ActionResult> AddGroup(long userId, long groupId)
        {
            
            await userService.AddGroup(userId, groupId);
            return Ok();
        }

        [HttpDelete("removeSubject")]
        public ActionResult RemoveSubject([FromBody] UserSubjectDto model)
        {

            userService.RemoveSubject(model.UserId, model.SubjectId);
            return Ok();
        }

        [HttpDelete("deleteUser")]
        public ActionResult DeleteUser(long userId)
        {
            userService.DeleteUser(userId);
            return Ok();
         
        }

        [HttpPost("createTimeTable")]
        public async Task<ActionResult> CreateTimeTable([FromBody]TimeTableDto model)
        {
            await userService.CreateTimeTableAsync(model);
            return Ok();
        }

        [HttpGet("getAllTeacherSubject")]
        public async Task<ActionResult> GetAllTeacherSubject()
        {
           var data =  await userService.GetAllTeacherSubject(User.GetUserId());
           return Ok(data);
        }
    }
}
