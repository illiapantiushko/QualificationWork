using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using QualificationWork.DTO.Dtos;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Command
{
  public  class SubjectCommand
    {
        private readonly ApplicationContext context;

        public SubjectCommand(ApplicationContext context)
        {
            this.context = context;
        }


        public async Task AddSubjectAsync(SubjectDto model)
        {
            var data = new Subject
            {
               SubjectName = model.SubjectName,
               IsActive  = model.IsActive,
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
                data.SubjectСlosingDate = model.SubjectСlosingDate;
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
