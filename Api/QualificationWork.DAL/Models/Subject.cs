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

        public DateTime SubjectСlosingDate { get; set; }

        public ICollection<UserSubject> UserSubjects { get; set; }

        public long CurrentFacultyId { get; set; }

        public virtual Faculty Faculty { get; set; }

    }
}
