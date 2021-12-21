using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;

namespace QualificationWork.DAL.Query
{
    public class SubjectQuery
    {
        private readonly ApplicationContext context;

        private readonly UserManager<ApplicationUser> userManager;

        public SubjectQuery(ApplicationContext context, UserManager<ApplicationUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        public List<Subject> GetSubjects()
        {
            var data = context.Subjects
                              .ToList();
            return data;
        }

        // вивести всі предмети де числиться певний студент
        // вивести всі предмети для певного викладача
        public async Task<List<ApplicationUser>> GetAllSubjectByUser()
        {
            var data = await context.Users
                  .Include(pub => pub.UserSubjects)
                                     .ThenInclude(pub => pub.Subject)
                                      .Include(pub => pub.UserRoles)
                                     .ThenInclude(pub => pub.Role)
                                                  .ToListAsync();
            return data;
        }

        //вивести всіх викладачів певної групи
        public async Task<List<ApplicationUser>> GetAllTeacherGroups(long groupId)
        {
            var teacher = context.Roles.FirstOrDefault(p => p.Name == UserRoles.Teacher);

            var response = await context.Users.Where(x => x.UserGroups.Any(y => y.GroupId == groupId))
            .Where(x => x.UserRoles.Any(y => y.RoleId == teacher.Id)).ToListAsync();

            return response;
        }

        //вивести всіх викладачів факультету
        public async Task<List<ApplicationUser>> GetAllTeacherFaculty(long facultyId)
        {
            var teacher = context.Roles.FirstOrDefault(p => p.Name == UserRoles.Teacher);

            var response = await context.Users
                    .Where(x => x.UserGroups.Any(y => y.Group.FacultyId == facultyId))
                    .Where(x => x.UserRoles.Any(y => y.RoleId == teacher.Id)).ToListAsync();
            return response;
        }

        //вивести всі групи для яких читається певний предмет
        public async Task<List<Group>> GetAllGroupsBySubject(long subjectId)
        {
            var response = await context.Groups.Where(x => x.SubjectGroups.Any(y => y.SubjectId == subjectId)).ToListAsync();

            return response;
        }

    }
}