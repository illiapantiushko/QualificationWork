using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Models
{
    public class TimeTable
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public long SubjectId { get; set; }
        public virtual Subject Subject { get; set; }
        public int LessonNumber { get; set; }
        public bool IsPresent { get; set; }
        public int Score { get; set; }
        public DateTime LessonDate { get; set; }

        //public long UserSubjectId { get; set; }
        //public virtual UserSubject UserSubject { get; set; }
    }
}
