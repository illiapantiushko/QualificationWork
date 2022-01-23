using Hangfire;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
            await CreateRoles();
            await CreateAdmin();
            //await CreateFaculty();
            //await CreateSubjects();
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

        //public async Task CreateFaculty()
        //{
        //    var data = new Faculty
        //    {
        //        FacultyName = "Economic",
        //        Groups = new List<Group>
        //        {
        //          new Group { GroupName = "KN-41" },
        //        }
        //    };

        //    var check = await context.Faculties.FirstOrDefaultAsync(p => p.FacultyName == data.FacultyName);

        //    if (check == null)
        //    {
        //        await context.AddAsync(data);
        //        await context.SaveChangesAsync();
        //    }

        //}


        //public async Task CreateSubjects()
        //{
        //    var listSubjects = new List<Subject>()
        //    {
        //            new Subject{ SubjectName="Компютерні мережі",AmountCredits=200,IsActive=true,SubjectСlosingDate= DateTime.UtcNow},
        //            new Subject{ SubjectName="Математичний аналіз",AmountCredits=300,IsActive=true,SubjectСlosingDate= DateTime.UtcNow},
        //            new Subject{ SubjectName="Лінійна алгебра",AmountCredits=250,IsActive=true,SubjectСlosingDate= DateTime.UtcNow}
        //                };

        //    foreach (var subject in listSubjects)
        //    {
        //        var checkSubject = await context.Subjects.FirstOrDefaultAsync(p => p.SubjectName == subject.SubjectName);

        //        if (checkSubject == null)
        //        {
        //            await context.AddAsync(subject);
        //        }
        //    }
        //}

        //public async Task CreateUsers()
        //{
        //    var listUsers = new List<ApplicationUser>()
        //            {
        //                new ApplicationUser{ UserName="Dima",Email="dima.sdsadsd@oa.edu.ua"},
        //                new ApplicationUser{ UserName="Sofia",Email="sofiia.prusik@oa.edu.ua"},
        //                new ApplicationUser{ UserName="dima",Email="dima.sdsadsd@oa.edu.ua"},
        //            };

        //    foreach (var user in listUsers)
        //    {
        //        var checkUser = await context.Users.FirstOrDefaultAsync(p => p.UserName == user.UserName);

        //        var group = context.Groups.First();

        //        if (checkUser == null)
        //        {
        //            ApplicationUser userData = new ApplicationUser
        //            {
        //                Email = user.Email,
        //                SecurityStamp = Guid.NewGuid().ToString(),
        //                UserName = user.UserName,
        //            };

        //            var userGroup = new UserGroup
        //            {
        //                UserId = userData.Id,
        //                GroupId = group.Id
        //            };

        //            await context.AddAsync(userData);
        //            await context.AddAsync(userGroup);
        //            await userManager.AddToRoleAsync(userData, UserRoles.Student);
        //        }

        //    }
        //}






        //public async Task CheckSubject()
        //{
        //    var subjects = await context.Subjects.ToListAsync();

        //    foreach (var subject in subjects)
        //    {

        //        if (subject.SubjectСlosingDate == DateTime.Today)
        //        {
        //            subject.IsActive = false;
        //        }
        //    }

        //}

        //public void BackgroundJobCheckingSubject()
        //{
        //    recurringJobManager.AddOrUpdate("Checking the activity of the subject", () => CheckSubject(), Cron.Daily);
        //}

    }
}