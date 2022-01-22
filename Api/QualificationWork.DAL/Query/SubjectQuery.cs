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

        public class UsersPagination {

            public int TotalCount { get; set; }

            public List<ApplicationUser> Users { get; set; }

            public UsersPagination(int totalCount, List<ApplicationUser> users)
            {
                this.TotalCount = totalCount;
                this.Users = users;
            }
        }

        // вивести всі предмети де числиться певний студент
        // вивести всі предмети для певного викладача
        public async Task<UsersPagination> GetAllUsersWithSubjests(int pageNumber, int pageSize, string search)
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
                                    .Include(pub => pub.UserSubjects)
                                    .ThenInclude(pub => pub.Subject)
                                    .Include(pub => pub.UserRoles)
                                    .ThenInclude(pub => pub.Role)
                                    .AsNoTracking()
                                    .ToListAsync();


          return new UsersPagination(totalCount, response);
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
                                        .Where(x => x.UserSubjects.Any(y => y.UserId == userId)).ToListAsync();  
            return response;
        }
    }
}