using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DAL.Models
{
  public  class SubjectGroup
    {
        public long Id { get; set; }
        public long SubjectId { get; set; }
        public virtual Subject Subject { get; set; }
        public long GroupId { get; set; }
        public virtual Group Group { get; set; }

    }
}
