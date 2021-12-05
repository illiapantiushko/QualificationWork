using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;


namespace QualificationWork.DAL
{
    public class ApplicationContext : IdentityDbContext<User>
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
            //  Many-to-Many, User to Topic 

            modelBuilder.Entity<UserSubject>()
                .HasOne<User>(sc => sc.User)
                .WithMany(s => s.UserSubjects)
                .HasForeignKey(sc => sc.UserId);


            modelBuilder.Entity<UserSubject>()
                .HasOne<Subject>(sc => sc.Subject)
                .WithMany(s => s.UserSubjects)
                .HasForeignKey(sc => sc.SubjectId);

            // One-to-Many, Faculty to Group
            modelBuilder.Entity<Group>()
           .HasOne<Faculty>(s => s.Faculty)
           .WithMany(g => g.Groups)
           .HasForeignKey(s => s.Id);

            // One-to-Many, User to Group
            modelBuilder.Entity<Group>()
                .HasOne<User>(s => s.User)
                .WithMany(g => g.Groups)
                .HasForeignKey(s => s.CurrentUserId);

            // One-to-Many, Subject to Group
            modelBuilder.Entity<Group>()
             .HasOne<Subject>(s => s.Subject)
             .WithMany(g => g.Groups)
             .HasForeignKey(s => s.Id);

            // One-to-Many, Group to Specialty
            modelBuilder.Entity<Specialty>()
           .HasOne<Group>(s => s.Group)
           .WithMany(g => g.Specialtys)
           .HasForeignKey(s => s.Id);

            // One-to-One, TimeTable to UserSubject

            modelBuilder.Entity<UserSubject>()
                .HasOne<TimeTable>(ad => ad.TimeTable)
                .WithOne(s => s.UserSubject)
                .HasForeignKey<TimeTable>(ad => ad.UserSubjectId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
