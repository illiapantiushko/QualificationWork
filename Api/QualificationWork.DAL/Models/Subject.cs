using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Models
{
    public class Subject
    {
        public long Id { get; set; }
        public string SubjectName { get; set; }
       
        public bool IsActive { get; set; }

        // кількість кредитів
        public int AmountCredits { get; set; }

        public DateTime SubjectСlosingDate { get; set; }


        // navigation property

        public virtual ICollection<UserSubject> UserSubjects { get; set; }

        public virtual ICollection<SubjectGroup> SubjectGroups { get; set; }


    }
}
