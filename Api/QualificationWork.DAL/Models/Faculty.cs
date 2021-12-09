using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Models
{
    public class Faculty
    {
        public long Id { get; set; }
        public string FacultyName { get; set; }


        // navigation property
        public virtual ICollection<Group> Groups { get; set; }
    }
}
