using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DAL.Models
{
 public class UsersPagination
    {
        public int TotalCount { get; set; }

        public List<ApplicationUser> Users { get; set; }

        public UsersPagination(int totalCount, List<ApplicationUser> users)
        {
            this.TotalCount = totalCount;
            this.Users = users;
        }
    }
}
