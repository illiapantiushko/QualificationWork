using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QualificationWork.BL.Services;
using QualificationWork.DTO.Dtos;
using System.Threading.Tasks;

namespace QualificationWork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
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

        [HttpGet("getSpecialtys")]
        public ActionResult GetSpecialtys()
        {
            var data = groupService.GetSpecialtys();
            return Ok(data);
        }

        [HttpGet("getAllGroup")]
        public async Task<ActionResult> GetAllGroup()
        {
            var data = await groupService.GetAllGroup();
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
