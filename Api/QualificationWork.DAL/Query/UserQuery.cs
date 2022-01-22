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

        public async Task<ApplicationUser> GetUser(long userId)
        {
            var user = await context.Users
                                    .Include(x=>x.UserGroups)
                                    .ThenInclude(x=>x.Group)
                                    .Include(x=>x.UserRoles)
                                    .ThenInclude(x => x.Role)
                                    .FirstOrDefaultAsync(w => w.Id == userId);

            return user;
        }

        public async Task<List<TimeTable>> GetTimeTable()
        {
            var data = await context.TimeTable
                              .ToListAsync();
            return data;
        }

        ////вивести всі предмети викладача та студентів які належать до предмета
        public async Task<List<Subject>> GetAllTeacherSubject()
        {
            //var teacher = context.Roles.FirstOrDefault(p => p.Name == UserRoles.Teacher);


            //var response = await context.UserSubjects
            //    .Include(x=>x.User)
            //    .Include(x=>x.Subject)
            //    .Where(x => x.UserId == userId)
            //    .ToListAsync();
            var response = await context.Subjects
                                         .Include(x => x.UserSubjects)
                                         .ThenInclude(x => x.User)
                                         .ToListAsync();

            return response;
        }

        // time table

        // вивести користувачів по предмету та номеру заняття
        public async Task<List<ApplicationUser>> GetUsersTimeTable(long subjectId, int namberleson)
        {
            var response = await context.Users
                                        .Where(x=>x.UserSubjects.Any(x=>x.SubjectId==subjectId))
                                        .Include(pub => pub.UserSubjects.Where(x=>x.SubjectId==subjectId))
                                        .ThenInclude(pub => pub.TimeTable.Where(x => x.LessonNumber == namberleson))
                                        .ToListAsync();
            return response;
        }

        public async Task<List<TimeTable>> GetSubjectTopic(long subjectId)
        {
            var list = new List<TimeTable>();

            var response = await context.TimeTable.Where(x=>x.UserSubject.Subject.Id == subjectId).ToListAsync();

            foreach (var item in response)
            {
                var leson = list.FirstOrDefault(x => x.LessonNumber == item.LessonNumber);
                
                if (leson == null) { list.Add(item); }
            }

            return list;
        }

        public async Task<List<TimeTable>> GetTimeTableByUser(long subjectId, long userId)
        {
            var data = await context.TimeTable
                            .Where(x=>x.UserSubject.SubjectId==subjectId && x.UserSubject.UserId == userId)
                            .ToListAsync();
            return data;
        }

    }
}
