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

        public virtual ICollection<ApplicationUserRole> UserRoles { get; set; }

        // navigation property

        public virtual ICollection<Group> Groups { get; set; }

        public virtual ICollection<UserSubject> UserSubjects { get; set; }

        [JsonIgnore]
        public List<RefreshToken> RefreshTokens { get; set; }
    }
}