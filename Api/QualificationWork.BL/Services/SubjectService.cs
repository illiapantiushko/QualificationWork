using QualificationWork.DAL;
using QualificationWork.DAL.Command;
using QualificationWork.DAL.Models;
using QualificationWork.DAL.Query;
using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using static QualificationWork.DAL.Query.SubjectQuery;

namespace QualificationWork.BL.Services
{
    public class SubjectService
    {
        private readonly SubjectQuery subjectQuery;

        private readonly SubjectCommand subjectCommand;

        private readonly ApplicationContext context;

        public SubjectService(ApplicationContext context, SubjectCommand subjectCommand, SubjectQuery subjectQuery)
        {
            this.context = context;
            this.subjectQuery = subjectQuery;
            this.subjectCommand = subjectCommand;
        }

        public async Task CreateSubjectAsync(SubjectDto model)
        {
            await subjectCommand.CreateSubjectAsync(model);
            await context.SaveChangesAsync();
        }

        public async Task UpdateSubjectAsync(long subjectId, SubjectDto model)
        {
            await subjectCommand.UpdateSubjectAsync(subjectId, model);
            await context.SaveChangesAsync();
        }

        public void DeleteSubject(long subjectId)
        {
            subjectCommand.DeleteSubject(subjectId);
            context.SaveChanges();
        }

        public List<Subject> GetSubjects()
        {
            return subjectQuery.GetSubjects();
        }

        public async Task<UsersPagination> GetAllUsersWithSubjests(int pageNumber, int pageSize, string search)
        {
            return await subjectQuery.GetAllUsersWithSubjests(pageNumber,pageSize,search);
        }

        public async Task<List<ApplicationUser>> GetAllTeacherFaculty(long facultyId)
        {
            return await subjectQuery.GetAllTeacherFaculty(facultyId);
        }

        public async Task<List<ApplicationUser>> GetAllTeacherGroups(long groupId)
        {
            return await subjectQuery.GetAllTeacherGroups(groupId);
        }


        public async Task<List<Group>> GetAllGroupsBySubject(long subjectId)
        {
            return await subjectQuery.GetAllGroupsBySubject(subjectId);
        }

        public async Task<List<Subject>> GetAllSubject(long userId)
        {
            return await subjectQuery.GetAllSubject(userId);
        }

        public async Task AddLessonAsync(AddLessonDto model)
        {
           await subjectCommand.AddLessonAsync(model);
           await context.SaveChangesAsync();
        }

        public async Task DeleteLessonAsync(int lessonNumber, long subjectId)
        {
            await subjectCommand.DeleteLessonAsync(lessonNumber,subjectId);
            await context.SaveChangesAsync();
        }
    }
}
