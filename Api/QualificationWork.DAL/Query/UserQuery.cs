using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Query
{
    public class UserQuery
    {
        private readonly ApplicationContext context;

        public UserQuery(ApplicationContext context)
        {
            this.context = context;

        }

        public async Task<List<ApplicationUser>> GetUsers()
        {
            var data = await context.Users
                              .ToListAsync();
            return data;
        }



        public async Task<List<TimeTable>> GetTimeTable()
        {
            var data = await context.TimeTable
                              .ToListAsync();
            return data;
        }

        ////вивести всі предмети викладача та студентів які належать до предмета
        public async Task<List<Subject>> GetAllTeacherSubject(long userId)
        {
            var teacher = context.Roles.FirstOrDefault(p => p.Name == UserRoles.Student);

            var response = await context.Subjects.Where(x => x.UserSubjects.Any(y => y.UserId == userId))
                 .Include(pub => pub.UserSubjects.Where(x => x.User.UserRoles.Any(y => y.RoleId == teacher.Id)))
                  .ThenInclude(pub => pub.User).ToListAsync();

            return response;
        }

        // time table

        // вивести користувачів та по предмету та номеру заняття
        public async Task<List<ApplicationUser>> GetUsersTimeTable(long subjectId, int namberleson)
        {
           
            var response = await context.Users.Where(x => x.UserSubjects.Any(y => y.SubjectId == subjectId))
                             .Include(pub => pub.UserSubjects)
                             .ThenInclude(pub => pub.Subject)
                             .Include(pub => pub.UserSubjects.Where(x => x.TimeTable.LessonNumber==namberleson))
                             .ThenInclude(pub => pub.TimeTable).ToListAsync();

            return response;
        }


        public async Task<List<TimeTable>> GetSubjectTopic(long subjectId)
        {
           var list = new List<TimeTable>();

            var response = await context.TimeTable.Where(x => x.UserSubjects.Any(y => y.SubjectId == subjectId))
                .ToListAsync();
            
            foreach (var item in response)
            {
               var leson = list.FirstOrDefault(x => x.LessonNumber == item.LessonNumber);
                if (leson == null) { list.Add(item); }
            }

            return list;
        }


        
    }
}
