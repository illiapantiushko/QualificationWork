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
            return context.Faculties.ToList();
        }

        public List<Specialty> GetSpecialtys()
        {
            return context.Specialtys.ToList();
        }

        public async Task<List<Group>> GetAllUserByGroup()
        {
            var data = await context.Groups
                  .Include(pub => pub.UserGroups)
                                     .ThenInclude(pub => pub.User)
                                                  .ToListAsync();
            return data;
        }

    }
}
