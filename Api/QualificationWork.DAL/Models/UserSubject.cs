using System.ComponentModel.DataAnnotations;

namespace QualificationWork.DAL.Models
{
    public class UserSubject
    {
        [Key]
        public long Id { get; set; }
        public long UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public long SubjectId { get; set; }
        public virtual Subject Subject { get; set; }

        // navigation property
        public virtual TimeTable TimeTable { get; set; }
    }
}