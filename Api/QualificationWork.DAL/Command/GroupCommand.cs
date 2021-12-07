using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Command
{
 public   class GroupCommand
    {

        private readonly ApplicationContext context;

        public GroupCommand(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task AddGroupAsync(GroupDto model)
        {
            var data = new GroupDto
            {
                GroupName = model.GroupName
            };

            await context.AddAsync(data);
        }
    }
}
