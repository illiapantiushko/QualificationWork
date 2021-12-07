using QualificationWork.DAL;
using QualificationWork.DAL.Command;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace QualificationWork.BL.Services
{
   public class UserService
    {
        private readonly UserCommand userCommand;

        private readonly ApplicationContext context;

        public UserService(ApplicationContext context, UserCommand userCommand)
        {
            this.userCommand = userCommand;
            this.context = context;
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

    }
}
