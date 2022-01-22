using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using QualificationWork.DTO.Dtos;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Command
{
    public class SubjectCommand
    {
        private readonly ApplicationContext context;

        public SubjectCommand(ApplicationContext context)
        {
            this.context = context;
        }

        public async Task CreateSubjectAsync(SubjectDto model)
        {
            var data = new Subject
            {
                SubjectName = model.SubjectName,
                IsActive = model.IsActive,
                AmountCredits = model.AmountCredits,
                SubjectСlosingDate = model.SubjectСlosingDate,
            };

            await context.AddAsync(data);
        }

        public async Task UpdateSubjectAsync(long subjectId, SubjectDto model)
        {
            var data = await context.Subjects.FirstOrDefaultAsync(m => m.Id == subjectId);

            if (data != null)
            {
                
                data.SubjectName = model.SubjectName;
                data.IsActive = model.IsActive;
                data.AmountCredits = model.AmountCredits;
                data.SubjectСlosingDate = model.SubjectСlosingDate;
            }
        }

        public async Task AddLessonAsync(AddLessonDto model)
        {
            var userSubjects = await context.UserSubjects.Where(m => m.SubjectId == model.SubjectId).ToListAsync();

            foreach(var userSubject in userSubjects) {
                var timeTable = new TimeTable
                {
                    LessonNumber = model.LessonNumber,
                    LessonDate = model.Date.ToUniversalTime(),
                    IsPresent = false,
                    Score = 0,
                    UserSubjectId = userSubject.Id
                };

                await context.AddAsync(timeTable);
            }
        }

        public async Task DeleteLessonAsync(int lessonNumber,long subjectId)
        {

            var timeTables = await context.TimeTable
                                 .Where(x => x.UserSubject.SubjectId == subjectId)
                                 .Where(x => x.LessonNumber == lessonNumber).ToListAsync();

            if (timeTables != null)
            {
              context.RemoveRange(timeTables);
            }
        }

        public void DeleteSubject(long subjectId)
        {
            var subject = context.Subjects.FirstOrDefault(m => m.Id == subjectId);

            if (subject != null)
            {
                context.Remove(subject);

            }
        }
    }
}
