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
        private readonly SubjectService subjectService;
        private readonly GroupService groupService;

        public UsersController(GroupService groupService,SubjectService subjectService, UserService userService)
        {
            this.userService = userService;
            this.subjectService = subjectService;
            this.groupService = groupService;
        }

        [HttpGet("getUsers")]
        public async Task<ActionResult> GetUsers()
        {
            var data = await userService.GetUsers();
            return Ok(data);
        }
       
        [HttpGet("getAllGroups")]
        public async Task<ActionResult> GetAllGroupsAsync(int pageNumber, int pageSize, string search)
        {
            var data = await groupService.GetAllGroups(pageNumber, pageSize, search);
            return Ok(data);
        }

        [HttpGet("getAllUsersWithSubjests")]
        public async Task<ActionResult> GetAllUsersWithSubjests(int pageNumber, int pageSize, string search)
        {
            var data = await subjectService.GetAllUsersWithSubjests(pageNumber, pageSize, search);
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

        [HttpPost("addGroup")]
        public async Task<ActionResult> AddGroup(long userId, long groupId)
        {

            await userService.AddGroup(userId, groupId);
            return Ok();
        }

        [HttpPost("addUserGroup")]
        public async Task<ActionResult> AddUserGroup([FromBody] AddUserGroupDto model)
        {
            await groupService.AddUserGroup(model.groupId, model.arrUserId);
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

        [HttpPost("addUserSubject")]
        public async Task<ActionResult> AddGroupSubject([FromBody] AddUserGroupDto model)
        {
            await groupService.AddGroupSubject(model.groupId, model.arrUserId);
            return Ok();
        }

        [HttpGet("getSubjects")]
        public ActionResult GetSubjects()
        {
            var data = subjectService.GetSubjects();
            return Ok(data);
        }

        [HttpDelete("deleteUser")]
        public ActionResult DeleteUser(long userId)
        {
            userService.DeleteUser(userId);
            return Ok();
        }

        [HttpDelete("deleteGroup")]
        public ActionResult DeleteGroup(long groupId)
        {
            groupService.DeleteGroup(groupId);
            return Ok();
        }

    }
}
