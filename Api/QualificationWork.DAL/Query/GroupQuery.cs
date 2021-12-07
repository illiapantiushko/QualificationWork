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
        public List<Group> GetGroupsBySubject(string subject)
        {
            var groups = context.Groups
                                .Include(s => s.SubjectGroups)
                                .ToList();
            return groups;
        }





    }
}
