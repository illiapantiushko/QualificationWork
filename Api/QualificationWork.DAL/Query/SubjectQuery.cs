using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using QualificationWork.DTO.Dtos;

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

        public async Task<Pagination<ApplicationUser>> GetAllUsersWithSubjests(int pageNumber, int pageSize, string search)
        {
            IQueryable<ApplicationUser> users = context.Users;

            if (!string.IsNullOrEmpty(search))
            {
                users = users.Where(e => e.UserName.ToLower().Contains(search)
                                            || e.Email.ToLower().Contains(search.ToLower()));
            }

            int totalCount = context.Users.Count();

            var response = await users.Skip((pageNumber - 1) * pageSize)
                                    .Take(pageSize)
                                    .Include(pub => pub.TimeTables.Where(x => x.LessonNumber == 1))
                                    .ThenInclude(pub => pub.Subject)
                                    .Include(pub => pub.UserRoles)
                                    .ThenInclude(pub => pub.Role)
                                    .AsNoTracking()
                                    .ToListAsync();

            return new Pagination<ApplicationUser>(totalCount, response);
        }

        //вивести всіх викладачів певної групи
        public async Task<List<ApplicationUser>> GetAllTeacherGroups(long groupId)
        {
            var response = await context.Users.Where(x => x.UserGroups.Any(y => y.GroupId == groupId))
                                              .Where(x => x.UserRoles.Any(y => y.Role.Name == UserRoles.Teacher)).ToListAsync();
           
            return response;
        }

        //вивести всіх викладачів факультету
        public async Task<List<ApplicationUser>> GetAllTeacherFaculty(long facultyId)
        {
            var response = await context.Users
                                        .Where(x => x.UserGroups.Any(y => y.Group.FacultyId == facultyId)).ToListAsync(); ;

            return response;
        }

        //вивести всі групи для яких читається певний предмет
        public async Task<List<Group>> GetAllGroupsBySubject(long subjectId)
        {
            var response = await context.Groups
                                        .Where(x => x.SubjectGroups.Any(y => y.SubjectId == subjectId)).ToListAsync();
            return response;
        }

        public async Task<List<Subject>> GetAllSubject(long userId)
        {
            var response = await context.Subjects
                                        .Where(x => x.TimeTables.Any(y => y.UserId == userId))
                                        .Include(x => x.TimeTables.Where(y=>y.UserId==userId))
                                        .Include(x=>x.TeacherSubjects)
                                        .ThenInclude(x=>x.User)
                                        .ToListAsync();
            return response;
        }

        public async Task<Pagination<Subject>> GetAllSubjects(int pageNumber, int pageSize, string search)
        {
            IQueryable<Subject> subjects = context.Subjects;

            if (!string.IsNullOrEmpty(search))
            {
                subjects = subjects.Where(e => e.SubjectName.ToLower().Contains(search));
            }

            int totalCount = context.Subjects.Count();

            var response = await subjects.Skip((pageNumber - 1) * pageSize)
                                    .Take(pageSize)
                                    .AsNoTracking()
                                    .ToListAsync();

            return new Pagination<Subject>(totalCount, response);
        }

        //public async Task<List<SubjectGroup>> GetAllSubjectStudent(long userId)
        //{
        //    var response = await context.SubjectGroups
        //                                .Include(x => x.Subject.UserSubjects)
        //                                .ThenInclude(x => x.User)
        //                                .Include(x => x.Group)
        //                                .Where(x => x.Group.UserGroups.Any(y => y.UserId == userId))
        //                                .ToListAsync();
        //    return response;
        //}
    }
}