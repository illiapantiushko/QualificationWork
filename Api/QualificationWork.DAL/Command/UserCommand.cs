using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

            //var user = await context.Users.FirstOrDefaultAsync(x=>x.Id == userId);

            if (roleName == "Admin")
            {

                await userManager.AddToRoleAsync(user, UserRoles.Admin);

            }

            else if (roleName == "Teacher")
            {
                await userManager.AddToRoleAsync(user, UserRoles.Teacher);
            }
            else if (roleName == "Student")
            {
                await userManager.AddToRoleAsync(user, UserRoles.Student);
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
            else if (roleName == "Student")
            {
                await userManager.RemoveFromRoleAsync(user, UserRoles.Student);
            }
        }

        public async Task СreateUserAsync(UserDto model)
        {
            ApplicationUser userData = new ApplicationUser
            {
                Email = model.UserEmail,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.UserName,
                ІsContract = model.ІsContract,
                Age = model.Age,
            };

            var result = await userManager.CreateAsync(userData);

            if (!result.Succeeded)
            {
                throw new AppException("Something went wrong");
            }
        }

        public async Task AddRangeUsers(List<UserDto> list)
        {
            foreach (var user in list)
            {
                ApplicationUser userData = new ApplicationUser
                {
                    Email = user.UserEmail,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = user.UserName,
                    ІsContract = user.ІsContract,
                    Age = user.Age,
                };
                await context.AddAsync(userData);
            }
        }

        public async Task AddSubject(long userId, long subjectId)
        {
            var data = new UserSubject
            {
                UserId = userId,
                SubjectId = subjectId,
                TimeTableId = 0

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
                Score = model.Score,
            };

            await context.AddAsync(data);
        }

        public void DeleteUser(long userId)
        {
            var user = context.Users.FirstOrDefault(m => m.Id == userId);

            if (user != null)
            {
                context.Remove(user);

            }
        }

        public async Task UpdateUserScore(UpdateUserScoreDto model)
        {
            var data = await context.TimeTable.FirstOrDefaultAsync(m => m.Id == model.Id);

            if (data != null)
            {
                data.Score = model.Score;
            }
        }

        public async Task UpdateUserIsPresent(UpdateUserIsPresentDto model)
        {
            var data = await context.TimeTable.FirstOrDefaultAsync(m => m.Id == model.Id);

            if (data != null)
            {
                data.IsPresent = model.IsPresent;
            }
        }


        //public async Task AddNewLeson(long subjectId, int lessonNumber,  DateTime dateTime)
        //{
        //    var list = await context.UserSubjects.Where(x => x.SubjectId == subjectId).ToListAsync();

        //    var data = new TimeTable
        //    {
        //        LessonDate = dateTime,
        //        IsPresent = true,
        //        LessonNumber = lessonNumber,
        //        Score = 0,
        //    };

        //    foreach (var item in list) {

        //        var userSubject = new UserSubject { UserId = item.UserId, SubjectId = item.SubjectId };
        //        data.UserSubjects.Add(userSubject);

        //    }

        //    //if (data != null)
        //    //{
        //    //    data.IsPresent = model.IsPresent;
        //    //}
        //}

    }

}