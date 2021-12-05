using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace QualificationWork.DAL.Models
{
    public class ApplicationRole : IdentityRole<long>
    {
        public ApplicationRole()
            : base()
        { }

        public ApplicationRole(string roleName)
            : base(roleName)
        { }

        public virtual ICollection<ApplicationUserRole> UserRoles { get; set; }
    }
}