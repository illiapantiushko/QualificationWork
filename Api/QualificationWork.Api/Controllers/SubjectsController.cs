using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QualificationWork.BL.Services;
using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {

        private readonly SubjectService subjectService;

        public SubjectsController(SubjectService subjectService)
        {

            this.subjectService = subjectService;
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
