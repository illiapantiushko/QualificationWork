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
            var check = await context.Users.FirstOrDefaultAsync(x => x.Email == model.UserEmail);

            if (check != null)
            {
                throw new AppException("User already exists");
            }

                var userData = new ApplicationUser
            {
                Email = model.UserEmail,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.UserName,
                ІsContract = model.ІsContract,
                Age = model.Age,
            };

             await userManager.CreateAsync(userData);
             await userManager.AddToRolesAsync(userData, model.Roles);            
        }

        public async Task AddRangeUsers(List<UserFromExcelDto> list)
        {
            foreach (var user in list)
            {
                var check = context.Users.FirstOrDefault(x => x.Email == user.UserEmail);
                
                if (check==null) {

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
        }

        //public async Task AddSubject(long userId, long subjectId)
        //{
        //    var filterTimeTables = new List<TimeTable>();

        //    var timeTables = await context.TimeTable.Where(x => x.UserSubject.Subject.Id == subjectId).ToListAsync();

        //    foreach (var item in timeTables)
        //    {
        //        var leson = filterTimeTables.FirstOrDefault(x => x.LessonNumber == item.LessonNumber);

        //        if (leson == null) { filterTimeTables.Add(item); }
        //    }

        //    var userSubject = new UserSubject
        //    {
        //        UserId = userId,
        //        SubjectId = subjectId
        //    };

        //    var check = await context.UserSubjects.FirstOrDefaultAsync(w => w.UserId == userId && w.SubjectId == subjectId);

        //    if (check == null)
        //    {
        //        if (filterTimeTables != null)
        //        {
        //            foreach (var item in filterTimeTables)
        //            {
        //                var timeTable = new TimeTable
        //                {
        //                    LessonNumber = item.LessonNumber,
        //                    LessonDate = item.LessonDate,
        //                    IsPresent = false,
        //                    Score = 0,
        //                };

        //                userSubject.TimeTable.Add(timeTable);
        //            };
        //        }

        //        await context.AddAsync(userSubject);
        //    }
        //}

        public async Task AddGroup(long userId, long groupId)
        {
            var data = new UserGroup
            {
                UserId = userId,
                GroupId = groupId
            };

            var check = context.UserGroups.FirstOrDefault(w => w.UserId == userId && w.GroupId == groupId);

            if (check==null)
            {
                await context.AddAsync(data);
            }
        }

        public async Task UpdateUserAsync(EditeUserDto model)
        {
            var data = await context.Users.FirstOrDefaultAsync(m => m.Id == model.Id);

            if (data != null)
            {
                data.UserName= model.UserName;
                data.Email = model.UserEmail;
                data.Age = model.Age;
                data.ІsContract = model.ІsContract;

                List<string> roles = new List<string>() { UserRoles.Admin, UserRoles.Teacher, UserRoles.Student };

                await userManager.RemoveFromRolesAsync(data, roles);

                await userManager.AddToRolesAsync(data, model.Roles);
            }
        }

        public void RemoveSubject(long userId, long subjectId)
        {
            var data = context.TimeTable
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
                UserId = model.UserId,
                SubjectId = model.SubjectId,
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
            var data = await context.TimeTable
                .Where(x=>x.LessonNumber==model.LessonNumber)
                .FirstOrDefaultAsync(m => m.UserId == model.Id);
                
            if (data != null)
            {
                data.Score = model.Score;
            }
        }

        public async Task UpdateUserIsPresent(UpdateUserIsPresentDto model)
        {
            var data = await context.TimeTable
                .Where(x => x.LessonNumber == model.LessonNumber)
                .FirstOrDefaultAsync(m => m.UserId == model.Id);

            if (data != null)
            {
                data.IsPresent = model.IsPresent;
            }
        }

        public async Task AddFacultyGroupAsync(long facultyId, string groupName)
        {
            var group = new Group
            {
                GroupName = groupName,
                FacultyId = facultyId
            };

            await context.AddAsync(group);
            await context.SaveChangesAsync();
        }

        public async Task CreateGroup(CreateGroupDto model)
        {
            var faculty = await context.Faculties.FirstOrDefaultAsync(x => x.FacultyName == model.NameFaculty);

            await AddFacultyGroupAsync(faculty.Id, model.NameGroup);
        }

    }

}