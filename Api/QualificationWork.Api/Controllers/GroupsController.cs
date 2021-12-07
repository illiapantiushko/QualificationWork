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
    public class GroupsController : ControllerBase
    {
        private readonly GroupService groupService;

        public GroupsController(GroupService groupService)
        {
           
            this.groupService = groupService;
        }

        [HttpPost("createGroup")]
        public async Task<ActionResult> CreateGroup([FromBody]GroupDto model)
        {
            await groupService.AddGroupAsync(model);
            return Ok();
        }


       
    }
}
