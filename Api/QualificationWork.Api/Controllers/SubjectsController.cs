using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QualificationWork.BL.Services;
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
    [Authorize]
    public class SubjectsController : ControllerBase
    {

        private readonly SubjectService subjectService;

        public SubjectsController(SubjectService subjectService)
        {

            this.subjectService = subjectService;
        }


        [HttpGet("getSubjects")]
        public ActionResult GetSubjects()
        {
            var data = subjectService.GetSubjects();
            return Ok(data);
        }

        [HttpGet("getAllTeacherFaculty")]
        public async Task<ActionResult> GetAllTeacherFaculty(long facultyId)
        {
            var data = await subjectService.GetAllTeacherFaculty(facultyId);
            return Ok(data);
        }

        [HttpGet("getAllTeacherGroups")]
        public async Task<ActionResult> GetAllTeacherGroups(long groupId)
        {
            var data = await subjectService.GetAllTeacherGroups(groupId);
            return Ok(data);
        }

        [HttpGet("getAllSubjectByStudent")]
        public async Task<ActionResult> GetAllSubjectByStudent()
        {
            var data = await subjectService.GetAllSubjectByStudent();
            return Ok(data);
        }

        [HttpPost("сreateSubject")]
        public async Task<ActionResult> CreateSubject([FromBody]SubjectDto model)
        {
            await subjectService.CreateSubjectAsync(model);
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
    }
}
