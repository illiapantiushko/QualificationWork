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
   
    public class UsersController : ControllerBase
    {
        private readonly UserService userService;
        private readonly CsvService csvService;

        public UsersController(UserService userService, CsvService csvService)
        {
            this.userService = userService;
            this.csvService = csvService;
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
        [HttpGet("getUsersTimeTable")]
        public async Task<ActionResult> GetUsersTimeTable(long subjectId, int namberleson)
        {
            var data = await userService.GetUsersTimeTable(subjectId, namberleson);
            return Ok(data);
        }
        [HttpGet("GetSubjectTopic")]
        public async Task<ActionResult> GetSubjectTopic(long subjectId)
        {
            var data = await userService.GetSubjectTopic(subjectId);
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

        public class DtoExel { 
        
            public IFormFile file { get; set; }
        }

        [HttpPost("AddUsersFromExel")]
        public async Task<ActionResult> AddUsersFromExel([FromForm]DtoExel model)
        {
            var data = await csvService.Import(model.file);
            //await userService.AddRangeUsers(data);
            return Ok(data);
         }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("getAllTeacherSubject")]
        public async Task<ActionResult> GetAllTeacherSubject()
        {
           var data =  await userService.GetAllTeacherSubject(User.GetUserId());
           return Ok(data);
        }

        [HttpPut("updateUserScore")]
        public async Task<ActionResult> UpdateUserScore([FromBody] UpdateUserScoreDto model)
        {
           await userService.UpdateUserScore(model);
           return Ok();
        }

        [HttpPut("updateUserIsPresent")]
        public async Task<ActionResult> UpdateUserIsPresent([FromBody]UpdateUserIsPresentDto model)
        {
            await userService.UpdateUserIsPresent(model);
            return Ok();
        }
    }
}
