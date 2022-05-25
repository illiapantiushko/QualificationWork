using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QualificationWork.BL.Services;
using QualificationWork.ClaimsExtension;
using QualificationWork.DAL.Models;
using QualificationWork.DTO.Dtos;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Teacher")]
    public class TeachersController : ControllerBase
    {

        private readonly SubjectService subjectService;
        private readonly UserService userService;

        public TeachersController(SubjectService subjectService, UserService userService)
        {
            this.subjectService = subjectService;
            this.userService = userService;
        }

        [HttpGet("getAllTeacherFaculty")]
        public async Task<ActionResult> GetAllTeacherFaculty(long facultyId)
        {
            var data = await subjectService.GetAllTeacherFaculty(facultyId);
            var result = data.Where(x => x.UserRoles.Any(y => y.Role.Name == UserRoles.Teacher));
            return Ok(data);
        }

        [HttpGet("getAllTeacherGroups")]
        public async Task<ActionResult> GetAllTeacherGroups(long groupId)
        {
            var data = await subjectService.GetAllTeacherGroups(groupId);
            var result = data.Where(x => x.UserRoles.Any(y => y.Role.Name == UserRoles.Teacher));
            return Ok(data);
        }
        [HttpGet("getAllSubjests")]
        public async Task<ActionResult> GetAllSubjects(int pageNumber, int pageSize, string search)
        {
             var data = await subjectService.GetAllSubjects(pageNumber, pageSize, search);
             return Ok(data);
        }
        [HttpGet("getUsersTimeTable")]
        public async Task<ActionResult> GetUsersTimeTable(long subjectId, int namberleson)
        {
            var data = await userService.GetUsersTimeTable(subjectId, namberleson);
            return Ok(data);
        }
        [HttpGet("getAllGroupsBySubject")]
        public async Task<ActionResult> GetAllGroupsBySubject(long subjectId)
        {
            var data= await subjectService.GetAllGroupsBySubject(subjectId);
            return Ok(data);
        }

        [HttpGet("getAllTeacherSubject")]
        public async Task<ActionResult> GetAllTeacherSubject()
        {
            var data = await userService.GetAllTeacherSubject(User.GetUserId());
            return Ok(data);
        }

        [HttpGet("GetSubjectTopic")]
        public async Task<ActionResult> GetSubjectTopic(long subjectId)
        {
            var data = await userService.GetSubjectTopic(subjectId);
            return Ok(data);
        }

        [HttpPost("сreateSubject")]
        public async Task<ActionResult> CreateSubject([FromBody]SubjectDto model)
        {
            await subjectService.CreateSubjectAsync(model);
            return Ok();
        }
        [HttpPost("addLesson")]
        public async Task<ActionResult> AddLessonAsync([FromBody] AddLessonDto model)
        {
            await subjectService.AddLessonAsync(model);
            return Ok();
        }

        [HttpPut("updateSubject")]
        public async Task<ActionResult> UpdateSubjectAsync(long subjectId, [FromBody]SubjectDto model)
        {
            await subjectService.UpdateSubjectAsync(subjectId, model);
            return Ok();
        }

        [HttpDelete("deleteSubject")]
        public ActionResult DeleteSubject(long subjectId)
        {
            subjectService.DeleteSubject(subjectId);
            return Ok();
        }
        [HttpDelete("deleteLesson")]
        public async Task<ActionResult> DeleteLessonAsync(int lessonNumber, long subjectId)
        {
            await subjectService.DeleteLessonAsync(lessonNumber, subjectId);
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


    }
}
