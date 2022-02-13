using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QualificationWork.BL.Services;
using QualificationWork.ClaimsExtension;
using QualificationWork.DTO.Dtos;
using System.Threading.Tasks;

namespace QualificationWork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
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
        [HttpGet("getCurrentUser")]
        public async Task<ActionResult> GetCurrentUser()
        {
            var data = await userService.GetUser(User.GetUserId());
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

        [HttpGet("getAllTeacherSubject")]
        public async Task<ActionResult> GetAllTeacherSubject()
        {
            var data = await userService.GetAllTeacherSubject(User.GetUserId());
            return Ok(data);
        }

        [HttpGet("getTimeTableByUser")]
        public async Task<ActionResult> GetTimeTableByUser(long subjectId)
        {
            var data = await userService.GetTimeTableByUser(subjectId, User.GetUserId());
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

        [HttpPost("addGroup")]
        public async Task<ActionResult> AddGroup(long userId, long groupId)
        {

            await userService.AddGroup(userId, groupId);
            return Ok();
        }

        [HttpPost("createTimeTable")]
        public async Task<ActionResult> CreateTimeTable([FromBody] TimeTableDto model)
        {
            await userService.CreateTimeTableAsync(model);
            return Ok();
        }

        [HttpPost("createGroup")]
        public async Task<ActionResult> CreateGroup([FromBody] CreateGroupDto model)
        {
            await userService.CreateGroup(model);
            return Ok();
        }

        [HttpPut("updateUserScore")]
        public async Task<ActionResult> UpdateUserScore([FromBody] UpdateUserScoreDto model)
        {
            await userService.UpdateUserScore(model);
            return Ok();
        }

        [HttpPut("updateUserIsPresent")]
        public async Task<ActionResult> UpdateUserIsPresent([FromBody] UpdateUserIsPresentDto model)
        {
            await userService.UpdateUserIsPresent(model);
            return Ok();
        }
        [HttpPut("updateUser")]
        public async Task<ActionResult> UpdateUserAsync( [FromBody] EditeUserDto model)
        {
            await userService.UpdateUserAsync(model);
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

    }
}
