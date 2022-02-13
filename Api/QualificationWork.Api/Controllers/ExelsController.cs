using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QualificationWork.BL.Services;
using QualificationWork.ClaimsExtension;
using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace QualificationWork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExelsController : ControllerBase
    {
        private readonly UserService userService;
        private readonly ExcelService excelService;

        public ExelsController(UserService userService, ExcelService excelService)
        {
            this.userService = userService;
            this.excelService = excelService;
        }

        [HttpPost("AddUsersFromExel")]
        public async Task<ActionResult> AddUsersFromExel([FromForm] ExelDto model)
        {
            var data = await excelService.Import(model.file);
            await userService.AddRangeUsers(data);
            return Ok(data);
        }

        [HttpPost("AddSubjectsFromExel")]
        public async Task<ActionResult> AddSubjectsFromExel([FromForm] ExelDto model)
        {
            var data = await excelService.ImportSubject(model.file);
            return Ok(data);
        }
        [HttpPost("addStudentSubjectFromExel")]
        public async Task<ActionResult> AddStudentSubjectFromExel([FromForm] ExelDto model)
        {
            var data = await excelService.ImportStusentSubject(model.file);
            return Ok(data);
        }
        [HttpPost("AddFacultyFromExel")]
        public async Task<ActionResult> AddFacultyFromExel([FromForm] ExelDto model)
        {
            var data = await excelService.ImportFaculty(model.file);
            return Ok(data);
        }

        [HttpGet("exportToExcelBySubject")]
        public async Task<ActionResult> ExportToExcelBySubject(long subjectId)
        {
            var stream = await excelService.ExportToExcelBySubject(subjectId);
            Response.ContentType = new MediaTypeHeaderValue("application/octet-stream").ToString();
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "users.xlsx");
        }

        //[Authorize]
        [HttpGet("exportToExcelByUser")]
        public async Task<ActionResult> ExportToExcelByUser(long userId)
        {
            var stream = await excelService.ExportToExcelByUser(userId);
            Response.ContentType = new MediaTypeHeaderValue("application/octet-stream").ToString();
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Report.xlsx");
        }

    }
}
