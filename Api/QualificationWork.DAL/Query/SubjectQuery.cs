using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Query
{
    class SubjectQuery
    {
        private readonly ApplicationContext context;

        private readonly UserManager<User> userManager;

        //_userManager.GetUsersInRoleAsync("myRole").Result


        public SubjectQuery(ApplicationContext context, UserManager<User> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        // вивести всі предмети для певного викладача, користувача
        public User GetUserSubjectById(string userId)
        {
            var data = context.Users
                                .Include(pub => pub.UserSubjects)
                                .ThenInclude(pub => pub.Subject)
                                .FirstOrDefault(pub => pub.Id == userId);         
            return data;
        }


        // вивести всі предмети де числиться певний студент
        public List<Subject> GetAllSubjectByStudent(string userId)
        {
            var data = context.Subjects
                                .Include(pub => pub.UserSubjects)
                                .ThenInclude(pub => pub.User.Id == userId)
                                .ToList();
            return data;
        }

    }
}
