using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;

namespace QualificationWork.DAL
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser, ApplicationRole, long, IdentityUserClaim<long>, ApplicationUserRole,
                                                        IdentityUserLogin<long>, IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
        public DbSet<Subject> Subjects { get; set; }
        //public DbSet<Specialty> Specialtys { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<TeacherSubject> TeacherSubjects { get; set; }
        public DbSet<TimeTable> TimeTable { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<SubjectGroup> SubjectGroups { get; set; }

        public DbSet<RefreshToken> RefreshToken { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                        .WithMany(r => r.UserRoles)
                        .HasForeignKey(ur => ur.RoleId)
                        .IsRequired();

                userRole.HasOne(ur => ur.User)
                        .WithMany(r => r.UserRoles)
                        .HasForeignKey(ur => ur.UserId)
                        .IsRequired();
            });

            modelBuilder.Entity<TeacherSubject>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Id)
                .ValueGeneratedOnAdd();

                entity.HasOne<ApplicationUser>(sc => sc.User)
                      .WithMany(s => s.TeacherSubjects)
                      .HasForeignKey(sc => sc.UserId)
                      .IsRequired();

                entity.HasOne<Subject>(sc => sc.Subject)
                      .WithMany(s => s.TeacherSubjects)
                      .HasForeignKey(sc => sc.SubjectId)
                      .IsRequired();

                //entity.HasMany(x => x.TimeTable)
                //.WithOne(x => x.UserSubject)
                //.HasForeignKey(x => x.UserSubjectId)
                //.IsRequired();
                   
            });

            modelBuilder.Entity<TimeTable>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Id)
                .ValueGeneratedOnAdd();

                entity.HasOne<ApplicationUser>(sc => sc.User)
                      .WithMany(s => s.TimeTables)
                      .HasForeignKey(sc => sc.UserId)
                      .IsRequired();

                entity.HasOne<Subject>(sc => sc.Subject)
                      .WithMany(s => s.TimeTables)
                      .HasForeignKey(sc => sc.SubjectId)
                      .IsRequired();
            });

            modelBuilder.Entity<UserGroup>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Id)
                .ValueGeneratedOnAdd();

                entity.HasOne<ApplicationUser>(sc => sc.User)
                      .WithMany(s => s.UserGroups)
                      .HasForeignKey(sc => sc.UserId)
                      .IsRequired();

                entity.HasOne<Group>(sc => sc.Group)
                      .WithMany(s => s.UserGroups)
                      .HasForeignKey(sc => sc.GroupId)
                      .IsRequired();
            });

            modelBuilder.Entity<SubjectGroup>(entity =>
            {
                entity.HasOne<Subject>(sc => sc.Subject)
                      .WithMany(s => s.SubjectGroups)
                      .HasForeignKey(sc => sc.SubjectId)
                      .IsRequired();

                entity.HasOne<Group>(sc => sc.Group)
                      .WithMany(s => s.SubjectGroups)
                      .HasForeignKey(sc => sc.GroupId)
                      .IsRequired();
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(s => s.Id)
                .ValueGeneratedOnAdd();

                entity.HasOne<Faculty>(s => s.Faculty)
                      .WithMany(g => g.Groups)
                      .HasForeignKey(s => s.FacultyId);
            });

            //modelBuilder.Entity<Specialty>(entity =>
            //{
            //    entity.HasKey(s => s.Id);
            //    entity.Property(s => s.Id)
            //    .ValueGeneratedOnAdd();

            //    entity.HasOne<Group>(s => s.Group)
            //            .WithMany(g => g.Specialtys)
            //            .HasForeignKey(s => s.GroupId);
            //});

        }
    }
}