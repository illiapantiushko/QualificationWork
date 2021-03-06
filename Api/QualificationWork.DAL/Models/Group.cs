using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QualificationWork.DAL.Models
{
    public class Group
    {
        [Key]   
        public long Id { get; set; }

        public string GroupName { get; set; }

        // navigation property
        public virtual ICollection<Specialty> Specialtys { get; set; }

        public virtual long FacultyId { get; set; }
        public virtual Faculty Faculty { get; set; }

        public virtual ICollection<UserGroup> UserGroups { get; set; }

        public virtual ICollection<SubjectGroup> SubjectGroups { get; set; }

      
    }
}