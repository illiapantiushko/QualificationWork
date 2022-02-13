using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QualificationWork.BL.Services;
using QualificationWork.DAL.Models;
using QualificationWork.DTO.Dtos;
using System.Threading.Tasks;

namespace QualificationWork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    [Authorize(Roles = "Student")]
    public class StudentsController : ControllerBase
    {
        private readonly GroupService groupService;

        public StudentsController(GroupService groupService)
        {
            this.groupService = groupService;
        }

        [HttpPost("addFacultyGroup")]
        public async Task<ActionResult> AddFacultyGroup(long facultyId, string GroupName)
        {
          await groupService.AddFacultyGroupAsync(facultyId, GroupName);
          return Ok();
        }

        [HttpPost("addGroupSpecialty")]
        public async Task<ActionResult> AddGroupSpecialty(long groupId, string specialtyName)
        {
            await groupService.AddGroupSpecialtyAsync(groupId, specialtyName);
            return Ok();
        }

        [HttpPost("addUserGroup")]
        public async Task<ActionResult> AddUserGroup([FromBody] AddUserGroupDto model)
        {
            await groupService.AddUserGroup(model.groupId, model.arrUserId);
            return Ok();
        }
        [HttpPost("addUserSubject")]
        public async Task<ActionResult> AddGroupSubject([FromBody] AddUserGroupDto model)
        {

            await groupService.AddGroupSubject(model.groupId, model.arrUserId);
            return Ok();
        }

        [HttpGet("getFaculty")]
        public ActionResult GetFaculty()
        {
            var data= groupService.GetFaculty();
            return Ok(data);
        }

        [HttpGet("getGroups")]
        public ActionResult GetGroups()
        {
            var data = groupService.GetGroups();
            return Ok(data);
        }

        [HttpGet("getAllGroups")]
        public async Task<ActionResult> GetAllGroupsAsync(int pageNumber, int pageSize, string search)
        {
            var data = await groupService.GetAllGroups(pageNumber, pageSize, search);
            return Ok(data); 
        }

        [HttpPost("createFaculty")]
        public async Task<ActionResult> CreateFaculty([FromBody] FacultyDto model)
        {
            await groupService.CreateFacultyAsync(model);
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
