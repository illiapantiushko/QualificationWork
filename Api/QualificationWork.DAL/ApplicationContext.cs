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
        public DbSet<Specialty> Specialtys { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<UserSubject> UserSubjects { get; set; }
        public DbSet<TimeTable> TimeTable { get; set; }

        public DbSet<RefreshToken> RefreshToken { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

            modelBuilder.Entity<UserSubject>(entity =>
            {
                entity.HasOne<ApplicationUser>(sc => sc.User)
                      .WithMany(s => s.UserSubjects)
                      .HasForeignKey(sc => sc.UserId);

                entity.HasOne<Subject>(sc => sc.Subject)
                      .WithMany(s => s.UserSubjects)
                      .HasForeignKey(sc => sc.SubjectId);

                entity.HasOne<TimeTable>(ad => ad.TimeTable)
                      .WithOne(s => s.UserSubject)
                      .HasForeignKey<TimeTable>(ad => ad.UserSubjectId);
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.HasOne<Faculty>(s => s.Faculty)
                      .WithMany(g => g.Groups)
                      .HasForeignKey(s => s.Id);

                entity.HasOne<ApplicationUser>(s => s.User)
                      .WithMany(g => g.Groups)
                      .HasForeignKey(s => s.CurrentUserId);

                entity.HasOne<Subject>(s => s.Subject)
                      .WithMany(g => g.Groups)
                      .HasForeignKey(s => s.Id);
            });

            // One-to-Many, Group to Specialty
            modelBuilder.Entity<Specialty>()
                        .HasOne<Group>(s => s.Group)
                        .WithMany(g => g.Specialtys)
                        .HasForeignKey(s => s.Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}