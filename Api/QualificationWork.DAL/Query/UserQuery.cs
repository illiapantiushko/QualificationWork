using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using QualificationWork.DTO.Dtos;
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
        public async Task<List<Subject>> GetAllTeacherSubject(long userId)
        {
            var response = await context.Subjects
                                         .Where(x=>x.TeacherSubjects.Any(y=>y.UserId==userId))
                                         .Include(x => x.TimeTables.Where(x=>x.LessonNumber==1))
                                         .ThenInclude(x => x.User)
                                         .ToListAsync();
            return response;
        }

        // time table

        // вивести користувачів по предмету та номеру заняття
        public async Task<List<ApplicationUser>> GetUsersTimeTable(long subjectId, int namberleson)
        {

            var response = await context.Users
                                    .Where(x=>x.TimeTables.Any(x=>x.SubjectId==subjectId))    
                                    .Include(pub => pub.TimeTables.Where(x=>x.LessonNumber==namberleson))
                                    .ToListAsync();
            return response;
        }

        public async Task<SubjectLessonsDto<TimeTable>> GetSubjectTopic(long subjectId)
        {
            var list = new List<TimeTable>();
            var subject = context.Subjects.FirstOrDefault(x => x.Id == subjectId);

            var response = await context.TimeTable
                                        .Where(x => x.SubjectId == subjectId)
                                        .ToListAsync();
            foreach (var item in response)
            {
                var leson = list.FirstOrDefault(x => x.LessonNumber == item.LessonNumber);

                if (leson == null)
                {
                    list.Add(item);
                }
            }

            var result = new SubjectLessonsDto<TimeTable>(subject.SubjectName, list);
            return result;
        }

        public async Task<Subject> GetTimeTableByUser(long subjectId, long userId)
        {
            var data = await context.Subjects
                             .Where(x => x.Id == subjectId)
                             .Include(x => x.TimeTables.Where(x => x.SubjectId == subjectId && x.UserId == userId))
                             .FirstOrDefaultAsync();
            return data;
        }

    }
}
