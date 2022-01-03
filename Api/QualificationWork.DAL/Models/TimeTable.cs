using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Models
{
    public class TimeTable
    {
        public long Id { get; set; }
        public int LessonNumber { get; set; }
        public bool IsPresent { get; set; }
        public int Score { get; set; }
        public DateTime LessonDate { get; set; }
        
      
        public virtual ICollection<UserSubject> UserSubjects { get; set; }
        //public virtual UserSubject UserSubjects { get; set; }
    }
}
