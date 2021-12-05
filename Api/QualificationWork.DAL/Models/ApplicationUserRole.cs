using Microsoft.AspNetCore.Identity;

namespace QualificationWork.DAL.Models
{
    public class ApplicationUserRole : IdentityUserRole<long>
    {
        public virtual ApplicationUser User { get; set; }

        public virtual ApplicationRole Role { get; set; }
    }
}