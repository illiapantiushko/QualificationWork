using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DAL.Models
{
  public  class GroupsPagination
    {
        public int TotalCount { get; set; }

        public List<Group> Groups { get; set; }

        public GroupsPagination(int totalCount, List<Group> groups)
        {
            this.TotalCount = totalCount;
            this.Groups = groups;
        }
    }
}
