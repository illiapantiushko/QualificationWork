using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;

namespace QualificationWork.DAL.Query
{
  public  class SubjectQuery
    {
        private readonly ApplicationContext context;

        private readonly UserManager<ApplicationUser> userManager;

        public SubjectQuery(ApplicationContext context, UserManager<ApplicationUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        // вивести всі предмети для певного викладача, користувача
        public ApplicationUser GetUserSubjectById(long userId)
        {
            var data = context.Users

                              .Include(pub => pub.UserSubjects)
                              .ThenInclude(pub => pub.Subject)
                              .FirstOrDefault(pub => pub.Id == userId);
            return data;
        }

        // вивести всі предмети де числиться певний студент
        public List<Subject> GetAllSubjectByStudent(long userId)
        {                             
                      
            var data = context.Subjects
                              .Include(pub => pub.UserSubjects)
                              .ThenInclude(pub => pub.User.Id == userId)
                              .ToList();
            return data;
        }
    }
}