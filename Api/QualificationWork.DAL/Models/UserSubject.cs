using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Models
{
    public class UserSubject
    {
        [Key]
        public long Id { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public long SubjectId { get; set; }
        public virtual Subject Subject { get; set; }

        public virtual TimeTable TimeTable { get; set; }
    }
}
