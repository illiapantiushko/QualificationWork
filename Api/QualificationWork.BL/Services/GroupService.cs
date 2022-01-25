using QualificationWork.DAL;
using QualificationWork.DAL.Command;
using QualificationWork.DAL.Models;
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

        public async Task AddFacultyGroupAsync(long facultyId, string GroupName)
        {
            await groupCommand.AddFacultyGroupAsync(facultyId, GroupName);
            await context.SaveChangesAsync();

        }

        public async Task CreateFacultyAsync(FacultyDto model)
        {
            await groupCommand.CreateFacultyAsync(model);
            await context.SaveChangesAsync();
        }


        public async Task AddGroupSpecialtyAsync(long groupId, string specialtyName)
        {
            await groupCommand.AddGroupSpecialtyAsync(groupId, specialtyName);
            await context.SaveChangesAsync();
        }

        public List<Group> GetGroups()
        {
            return groupQuery.GetGroups();
        }

        public List<Faculty> GetFaculty()
        {
            return groupQuery.GetFaculty();
        }

        public List<Specialty> GetSpecialtys()
        {
            return groupQuery.GetSpecialtys();
        }

        public async Task<GroupsPagination> GetAllGroups(int pageNumber, int pageSize, string search)
        {

            return await groupQuery.GetAllGroups(pageNumber, pageSize, search);
        }




    }
}
