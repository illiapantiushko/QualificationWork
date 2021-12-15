using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;

namespace QualificationWork.DAL.Query
{
  public  class SubjectQuery
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



        // вивести всі предмети для певного викладача, користувача
        public async Task<ApplicationUser> GetUserSubjectById(long userId)
        {
            var data = await context.Users
                              .Include(pub => pub.UserSubjects)
                              .ThenInclude(pub => pub.Subject)
                              .FirstOrDefaultAsync(pub => pub.Id == userId);
            return data;
        }

        // вивести всі предмети де числиться певний студент
        public async Task<List<ApplicationUser>> GetAllSubjectByStudent()
        {

            var data = await context.Users
                  .Include(pub => pub.UserSubjects)
                                     .ThenInclude(pub => pub.Subject)
                                                  .ToListAsync();
            return data;
        }

        //вивести всіх викладачів певної групи
        public async Task<List<ApplicationUser>>  GetAllTeacherGroups(long groupId)
        {
            const string RoleName = "Teacher";

            var teacher = context.Roles.FirstOrDefault(p => p.Name == RoleName);
            
            var response = await context.Users.Where(x => x.UserGroups.Any(y => y.GroupId == groupId))
            .Where(x => x.UserRoles.Any(y => y.RoleId == teacher.Id)).ToListAsync();

            return response;
        }


        //вивести всіх викладачів факультету
        public async Task<List<ApplicationUser>> GetAllTeacherFaculty(long facultyId)
        {
            const string RoleName = "Teacher";

            var teacher = context.Roles.FirstOrDefault(p => p.Name == RoleName);

            var response = await context.Users
                    .Where(x => x.UserGroups.Any(y=> y.Group.FacultyId == facultyId))
                    .Where(x => x.UserRoles.Any(y => y.RoleId == teacher.Id)).ToListAsync();
            return response;
        }

    }
}