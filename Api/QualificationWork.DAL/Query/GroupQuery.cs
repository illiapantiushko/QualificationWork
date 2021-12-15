using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QualificationWork.DAL.Query
{
   public class GroupQuery
    {

        private readonly ApplicationContext context;


        public GroupQuery(ApplicationContext context)
        {
            this.context = context;
        }

        //вивести всі групи для яких читається певний предмет
        // можливо, можна зінити SubjectName на id
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

    }
}
