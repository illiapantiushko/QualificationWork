using QualificationWork.DAL;
using QualificationWork.DAL.Command;
using QualificationWork.DAL.Query;
using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace QualificationWork.BL.Services
{
    public class GroupService
    {
        private readonly GroupCommand groupCommand;

        private readonly GroupQuery groupQuery;

        private readonly ApplicationContext context;

        public GroupService(ApplicationContext context, GroupQuery groupQuery, GroupCommand groupCommand)
        {
            this.context = context;
            this.groupCommand = groupCommand;
            this.groupQuery = groupQuery;
        }

        public async Task AddGroupAsync(GroupDto model)
        {
            await groupCommand.AddGroupAsync(model);
            await context.SaveChangesAsync();
        }
    }
}
