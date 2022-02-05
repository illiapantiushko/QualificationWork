using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Query
{
    public class GroupQuery
    {
        private readonly ApplicationContext context;

        public GroupQuery(ApplicationContext context)
        {
            this.context = context;
        }

        public List<Group> GetGroups()
        {
            var groups = context.Groups
                                .ToList();
            return groups;
        }

        public List<Faculty> GetFaculty()
        {
            return context.Faculties
                          .ToList();
        }


        public async Task<List<TimeTable>> GetTimeTableByUser(long userId)
        {
            var response = await context.TimeTable.Where(x => x.UserSubject.UserId == userId)
                                                  .Include(x => x.UserSubject)
                                                  .ThenInclude(x => x.Subject)
                                                  .ToListAsync();
            return response;

        }

        public async Task<List<TimeTable>> GetTimeTableBySubject(long subjectId)
        {
            var response = await context.TimeTable.Where(x => x.UserSubject.SubjectId == subjectId)
                                                  .Include(x => x.UserSubject)
                                                  .ThenInclude(x => x.User)
                                                  .ToListAsync();
            return response;

        }

        public List<Specialty> GetSpecialtys()
        {
            return context.Specialtys
                          .ToList();
        }

        public async Task<GroupsPagination> GetAllGroups(int pageNumber, int pageSize, string search)
        {
            IQueryable<Group> groups = context.Groups;

            if (!string.IsNullOrEmpty(search))
            {
                groups = groups.Where(e => e.GroupName.ToLower().Contains(search));
            }

            int totalCount = context.Groups.Count();

            var response = await groups.Skip((pageNumber - 1) * pageSize)
                                    .Take(pageSize)
                                    .Include(pub=>pub.Faculty)
                                    .Include(pub => pub.UserGroups)
                                    .ThenInclude(pub => pub.User)
                                    .ToListAsync();
            return new GroupsPagination(totalCount, response);
        }

    }
}
