using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading.Tasks;

namespace QualificationWork.DAL.Command
{
    public class GroupCommand
    {

        private readonly ApplicationContext context;

        public GroupCommand(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task AddFacultyGroupAsync(long facultyId, string groupName)
        {

            var group = new Group
            {
                GroupName = groupName,
                FacultyId = facultyId
            };

            await context.AddAsync(group);

        }

        public async Task CreateFacultyAsync(FacultyDto model)
        {
            var data = new Faculty
            {
                FacultyName = model.FacultyName
            };

            await context.AddAsync(data);
        }

        public async Task AddGroupSpecialtyAsync(long groupId, string specialtyName)
        {
            var specialty = new Specialty
            {
                SpecialtyName = specialtyName,
                GroupId = groupId
            };

            await context.AddAsync(specialty);

        }
    }
}
