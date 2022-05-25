using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QualificationWork.BL.Services;
using QualificationWork.ClaimsExtension;
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
        private readonly SubjectService subjectService;
        private readonly UserService userService;

        public StudentsController(GroupService groupService,UserService userService,SubjectService subjectService)
        {
            this.groupService = groupService;
            this.userService = userService;
            this.subjectService = subjectService;
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

        [HttpGet("getTimeTableByUser")]
        public async Task<ActionResult> GetTimeTableByUser(long subjectId)
        {
            var data = await userService.GetTimeTableByUser(subjectId, User.GetUserId());
            return Ok(data);
        }
        [HttpGet("GetAllSubject")]
        public async Task<ActionResult> GetAllSubject()
        {
            var data = await subjectService.GetAllSubject(User.GetUserId());
            return Ok(data);
        }

        [HttpPost("createFaculty")]
        public async Task<ActionResult> CreateFaculty([FromBody] FacultyDto model)
        {
            await groupService.CreateFacultyAsync(model);
            return Ok();
        }
    }
}
