using Hangfire;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QualificationWork.DAL.HelperServise
{
    public class DBInitializer
    {
        private readonly IRecurringJobManager recurringJobManager;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ApplicationContext context;

        public DBInitializer(RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager, ApplicationContext context, IRecurringJobManager recurringJobManager)
        {
            this.roleManager = roleManager;
            this.context = context;
            this.userManager = userManager;
            this.recurringJobManager = recurringJobManager;


        }

        public async Task SeedAsync()
        {
            //BackgroundJobCheckingSubject();
            await CreateAdmin();
            await CreateRoles();
            await context.SaveChangesAsync();

        }

        public async Task CreateRoles()
        {
            List<string> roles = new List<string>() { UserRoles.Admin, UserRoles.Teacher, UserRoles.Student };

            foreach (var role in roles)
            {
                var roleName = await context.Roles.FirstOrDefaultAsync(p => p.Name == role);

                if (roleName == null)
                {
                    await roleManager.CreateAsync(new ApplicationRole { Name = role });
                }
            }
        }

        public async Task CreateAdmin()
        {
            string adminEmail = "illia.pantiushko@oa.edu.ua";

            var admin = await context.Users.FirstOrDefaultAsync(p => p.Email == adminEmail);

            if (admin == null)
            {
                ApplicationUser userData = new ApplicationUser
                {
                    Email = adminEmail,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = adminEmail,
                };

                await userManager.CreateAsync(userData);

                await userManager.AddToRoleAsync(userData, UserRoles.Admin);
            }

        }


        public async Task CheckSubject()
        {
            var subjects = await context.Subjects.ToListAsync();

            foreach (var subject in subjects)
            {

                if (subject.SubjectСlosingDate == DateTime.Today)
                {
                    subject.IsActive = false;
                }
            }

        }

        //public void BackgroundJobCheckingSubject()
        //{
        //    recurringJobManager.AddOrUpdate("Checking the activity of the subject", () => CheckSubject(), Cron.Daily);
        //}

    }
}
