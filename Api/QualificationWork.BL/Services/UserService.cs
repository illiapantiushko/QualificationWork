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
   public class UserService
    {
      
        private readonly UserCommand userCommand;
        private readonly UserQuery userQuery;
        private readonly ApplicationContext context;

        public UserService(ApplicationContext context, UserCommand userCommand, UserQuery userQuery)
        {
            this.userCommand = userCommand;
            this.context = context;
            this.userQuery = userQuery;
        }

        public async Task<List<ApplicationUser>> GetUsers()
        {
            return await userQuery.GetUsers();
        }

        public async Task<List<TimeTable>> GetTimeTable()
        {
            return await userQuery.GetTimeTable();
        }

        public async Task AddRoleAsync(string userId, string roleName)
        {
          await userCommand.AddRoleAsync(userId, roleName);
          await  context.SaveChangesAsync();
        }

        public async Task DeleteRolesAsync(string userId, string roleName)
        {
            await userCommand.DeleteRolesAsync(userId, roleName);
            await context.SaveChangesAsync();
        }

        public async Task СreateUserAsync(string userName, string userEmail)
        {
            await userCommand.СreateUserAsync(userName,  userEmail);
            await context.SaveChangesAsync();
        }

        public async Task AddSubject(long userId, long subjectId)
        {
            await userCommand.AddSubject(userId, subjectId);
            await context.SaveChangesAsync();
        }

        public async Task AddGroup(long userId, long groupId)
        {
            await userCommand.AddGroup( userId, groupId);
            await context.SaveChangesAsync();

        }

        public void RemoveSubject(long userId, long subjectId)
        {
            userCommand.RemoveSubject(userId, subjectId);
            context.SaveChanges();

        }

        public async Task CreateTimeTableAsync(TimeTableDto model)
        {
            await userCommand.CreateTimeTableAsync(model);
            await context.SaveChangesAsync();
        }

    }
}
