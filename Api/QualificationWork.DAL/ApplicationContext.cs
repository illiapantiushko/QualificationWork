using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;


namespace QualificationWork.DAL
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Faculty> Faculties { get; set; }
        public DbSet<UserSubject> UserSubjects { get; set; }
        public DbSet<TimeTable> TimeTable { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //  Many-to-Many, User to Topic

            modelBuilder.Entity<UserSubject>(userTopic =>
            {
                userTopic.HasKey(sc => new { sc.UserId, sc.SubjectId });

                userTopic.HasOne(b => b.User)
                .WithMany(ba => ba.UserSubjects)
                .HasForeignKey(bi => bi.UserId);

                userTopic.HasOne(b => b.Subject)
                .WithMany(ba => ba.UserSubjects)
                .HasForeignKey(bi => bi.SubjectId);

            });

            // One-to-Many, Faculty to Topics

            modelBuilder.Entity<Subject>()
                .HasOne<Faculty>(s => s.Faculty)
                .WithMany(g => g.Subjects)
                .HasForeignKey(s => s.CurrentFacultyId);

            // One-to-One, TimeTable to UserTopic

            modelBuilder.Entity<TimeTable>()
                .HasOne<UserSubject>(ad => ad.UserSubject)
                .WithOne(s => s.TimeTable)
                .HasForeignKey<TimeTable>(ad => ad.UserSubjectId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
