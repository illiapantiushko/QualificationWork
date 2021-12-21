using QualificationWork.DAL;
using QualificationWork.DAL.Command;
using QualificationWork.DAL.Models;
using QualificationWork.DAL.Query;
using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<List<ApplicationUser>> GetAllSubjectByUser()
        {
            return await subjectQuery.GetAllSubjectByUser();

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

    }
}
