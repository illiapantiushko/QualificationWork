using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Command
{
    class UserCommand
    {
        private readonly ApplicationContext context;

        private readonly UserManager<User> userManager;

        public UserCommand(ApplicationContext context, UserManager<User> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        public async Task AddRoleAsync(string userId, string roleName)
        {
            var user = await userManager.FindByIdAsync(userId);

            if (roleName == "Admin") {
                await userManager.AddToRolesAsync(user, new List<string>() { UserRoles.Admin });
            }

            else if (roleName == "Teacher") {
                await userManager.AddToRolesAsync(user, new List<string>() { UserRoles.Teacher });
            }

        }

        public async Task DeleteRolesAsync(string userId, string roleName)
        {
            var user = await userManager.FindByIdAsync(userId);

            await userManager.RemoveFromRoleAsync(user, UserRoles.Admin);

            if (roleName == "Admin")
            {
                await userManager.RemoveFromRoleAsync(user, UserRoles.Admin);
            }

            else if (roleName == "Teacher")
            {
                await userManager.RemoveFromRoleAsync(user, UserRoles.Teacher);
            }
        }

        public async Task AddSubjectById(string userId, long subjectId)
        {
            var data = new UserSubject
            {
                UserId = userId,
                SubjectId = subjectId
            };
             await context.AddAsync(data);
        }

        public void RemoveSubjectById(string userId, long subjectId)
        {
            var data = context.UserSubjects
                                            .Where(pub => pub.UserId == userId)
                                            .FirstOrDefault(pub => pub.SubjectId == subjectId);
            if (data != null)
            {
                context.Remove(data);
            }
        }


    }
}
