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

        public DbSet<RefreshToken> RefreshToken { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //  Many-to-Many, User to Topic

            modelBuilder.Entity<UserSubject>()
                .HasOne<User>(sc => sc.User)
                .WithMany(s => s.UserSubjects)
                .HasForeignKey(sc => sc.UserId);


            modelBuilder.Entity<UserSubject>()
                .HasOne<Subject>(sc => sc.Subject)
                .WithMany(s => s.UserSubjects)
                .HasForeignKey(sc => sc.SubjectId);

            //modelBuilder.Entity<UserSubject>(userTopic =>
            //{
            //    userTopic.HasKey(sc => new { sc.UserId, sc.SubjectId });

            //    userTopic.HasOne(b => b.User)
            //    .WithMany(ba => ba.UserSubjects)
            //    .HasForeignKey(bi => bi.UserId);

            //    userTopic.HasOne(b => b.Subject)
            //    .WithMany(ba => ba.UserSubjects)
            //    .HasForeignKey(bi => bi.SubjectId);

            //});

            // One-to-Many, Faculty to Subject

            modelBuilder.Entity<Subject>()
                .HasOne<Faculty>(s => s.Faculty)
                .WithMany(g => g.Subjects)
                .HasForeignKey(s => s.CurrentFacultyId);


            // One-to-One, TimeTable to UserSubject

            modelBuilder.Entity<UserSubject>()
                .HasOne<TimeTable>(ad => ad.TimeTable)
                .WithOne(s => s.UserSubject)
                .HasForeignKey<TimeTable>(ad => ad.UserSubjectId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
