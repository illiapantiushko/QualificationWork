using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DAL.Models
{
   public class Specialty
    {
        public long Id { get; set; }

        public string SpecialtyName { get; set; }

        // navigation property

        public virtual Group Group { get; set; }
    }
}
