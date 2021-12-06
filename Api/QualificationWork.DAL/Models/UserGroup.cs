using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DAL.Models
{
     public class UserGroup
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public long GroupId { get; set; }
        public virtual Group Group { get; set; }

    }
}
