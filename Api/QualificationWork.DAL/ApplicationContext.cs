using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;


namespace QualificationWork.DAL
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Faculty> Faculties { get; set; }

        public DbSet<UserTopic> UserTopics { get; set; }

        public DbSet<TimeTable> TimeTable { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //  Many-to-Many, User to Topic

            modelBuilder.Entity<UserTopic>()
                .HasOne(b => b.User)
                .WithMany(ba => ba.UserTopics)
                .HasForeignKey(bi => bi.UserId);

            modelBuilder.Entity<UserTopic>()
                .HasOne(b => b.Topic)
                .WithMany(ba => ba.UserTopics)
                .HasForeignKey(bi => bi.TopicId);

            // One-to-Many, Faculty to Topics

            modelBuilder.Entity<Faculty>()
                .HasMany(c => c.Topics)
                .WithOne(e => e.Faculty);

            // One-to-One, TimeTable to UserTopic

            modelBuilder.Entity<TimeTable>()
                .HasOne<UserTopic>(ad => ad.UserTopic)
                .WithOne(s => s.TimeTable)
                .HasForeignKey<TimeTable>(ad => ad.UserTopicId);


            base.OnModelCreating(modelBuilder);
        }
    }
}
