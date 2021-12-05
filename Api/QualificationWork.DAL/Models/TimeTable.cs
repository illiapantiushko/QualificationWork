using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Models
{
    public class TimeTable
    {
        public long Id { get; set; }
        public DateTime LessonDate { get; set; }
        public bool IsPresent { get; set; }
        public int LessonNumber { get; set; }
        
       
        // navigation property
        public long UserSubjectId { get; set; }
        public virtual UserSubject UserSubject { get; set; }
    }
}
