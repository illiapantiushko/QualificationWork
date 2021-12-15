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
    public class GroupsController : ControllerBase
    {
        private readonly GroupService groupService;

        public GroupsController(GroupService groupService)
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

        [HttpPost("createFaculty")]
        public async Task<ActionResult> CreateFaculty([FromBody] FacultyDto model)
        {
            await groupService.CreateFacultyAsync(model);
            return Ok();
        }


    }
}
