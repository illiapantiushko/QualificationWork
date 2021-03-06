using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace QualificationWork.DAL.Models
{
    public class ApplicationUser : IdentityUser<long>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public bool ІsContract { get; set; }
        public string Specialty { get; set; }
        public string ProfilePicture { get; set; }

        public virtual ICollection<ApplicationUserRole> UserRoles { get; set; }

        // navigation property

        public virtual ICollection<TimeTable> TimeTables { get; set; }
        public virtual ICollection<UserGroup> UserGroups { get; set; }

        public virtual ICollection<TeacherSubject> TeacherSubjects { get; set; }

        [JsonIgnore]
        public List<RefreshToken> RefreshTokens { get; set; }
    }
}