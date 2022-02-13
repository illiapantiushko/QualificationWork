using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<ApplicationUser> userManager;

        public GroupCommand(ApplicationContext context, UserManager<ApplicationUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
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

        public void DeleteGroup(long groupId)
        {
            var group = context.Groups.FirstOrDefault(m => m.Id == groupId);

            if (group != null)
            {
                context.Remove(group);

            }
        }

        public async Task AddUserGroup(long groupId, long[] arrUserId)
        {
            var group = await context.Groups.FirstOrDefaultAsync(m => m.Id == groupId);

            foreach (var userId in arrUserId) {

                var user = await context.Users.FirstOrDefaultAsync(m => m.Id == userId);

                var checkStudentRole= await userManager.IsInRoleAsync(user, UserRoles.Student);

                if (checkStudentRole) {
                    var check = context.UserGroups
                                       .Where(x => x.UserId == userId)
                                       .FirstOrDefault(m => m.GroupId == groupId);

                    if (check == null)
                    {
                        var userGroup = new UserGroup
                        {
                            GroupId = group.Id,
                            UserId = userId
                        };

                        await context.AddAsync(userGroup);
                    }
                }
            }
        }

        public async Task AddGroupSubject(long groupId, long[] arrSubjectId)
        {
            var group = await context.Groups.FirstOrDefaultAsync(m => m.Id == groupId);

            foreach (var subjectId in arrSubjectId)
            {
                    var check = context.SubjectGroups
                                       .Where(x => x.SubjectId == subjectId)
                                       .FirstOrDefault(m => m.GroupId == groupId);

                    if (check == null)
                    {
                        var subjectGroups = new SubjectGroup
                        {
                            GroupId = group.Id,
                            SubjectId = subjectId
                        };

                        await context.AddAsync(subjectGroups);
                    }   
            }
        }

    }
}
