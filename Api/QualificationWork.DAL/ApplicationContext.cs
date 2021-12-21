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

            modelBuilder.Entity<UserSubject>(entity =>
            {
                entity.HasOne<ApplicationUser>(sc => sc.User)
                      .WithMany(s => s.UserSubjects)
                      .HasForeignKey(sc => sc.UserId)
                      .IsRequired();

                entity.HasOne<Subject>(sc => sc.Subject)
                      .WithMany(s => s.UserSubjects)
                      .HasForeignKey(sc => sc.SubjectId)
                      .IsRequired();

                entity.HasOne<TimeTable>(ad => ad.TimeTable)
                      .WithOne(s => s.UserSubject)
                      .HasForeignKey<TimeTable>(ad => ad.UserSubjectId);
            });

            modelBuilder.Entity<UserGroup>(entity =>
            {
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

            modelBuilder.Entity<Specialty>(entity =>
            {
                entity.HasKey(s => s.Id);
                entity.Property(s => s.Id)
                .ValueGeneratedOnAdd();

                entity.HasOne<Group>(s => s.Group)
                        .WithMany(g => g.Specialtys)
                        .HasForeignKey(s => s.GroupId);
            });

            
            //base.OnModelCreating(modelBuilder);
        }
    }
}