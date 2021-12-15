using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using QualificationWork.DAL.Models;
using QualificationWork.DTO.Dtos;
using QualificationWork.Middleware;

namespace QualificationWork.DAL.Command
{
  public class UserCommand
    {
        private readonly ApplicationContext context;

        private readonly UserManager<ApplicationUser> userManager;

        public UserCommand(ApplicationContext context, UserManager<ApplicationUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        public async Task AddRoleAsync(string userId, string roleName)
        {
            var user = await userManager.FindByIdAsync(userId);

            if (roleName == "Admin") {

                await userManager.AddToRoleAsync(user, UserRoles.Admin);
                //await userManager.AddToRolesAsync(user, new List<string>() { UserRoles.Admin });
            }

            else if (roleName == "Teacher") {
                await userManager.AddToRoleAsync(user, UserRoles.Teacher);
                //await userManager.AddToRolesAsync(user, new List<string>() { UserRoles.Teacher });
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

        public async Task СreateUserAsync(string userName, string userEmail)
        {
            ApplicationUser userData = new ApplicationUser
            {
                Email = userEmail,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = userName,
            };

            var result = await userManager.CreateAsync(userData);

            if (!result.Succeeded)
            {
                throw new AppException("Something went wrong");
            }
        }

        public async Task AddSubject(long userId, long subjectId)
        {
            var data = new UserSubject
            {
                UserId = userId,
                SubjectId = subjectId
            };
             await context.AddAsync(data);
        }

        public async Task AddGroup(long userId, long groupId)
        {
            var data = new UserGroup
            {
                UserId = userId,
                GroupId = groupId
            };
            await context.AddAsync(data);
        }

        public void RemoveSubject(long userId, long subjectId)
        {
            var data = context.UserSubjects
                              .Where(pub => pub.UserId == userId)
                              .FirstOrDefault(pub => pub.SubjectId == subjectId);

            if (data != null)
            {
                context.Remove(data);
            }
        }



        public async Task CreateTimeTableAsync(TimeTableDto model)
        {
            var data = new TimeTable
            {
                LessonDate = model.LessonDate,
                IsPresent = model.IsPresent,
                LessonNumber = model.LessonNumber,
                UserSubjectId = model.UserSubjectId,
            };

            await context.AddAsync(data);
        }
    }
}