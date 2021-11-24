using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Models
{
    public class UserTopic
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public long TopicId { get; set; }
        public Topic Topic { get; set; }

        public TimeTable TimeTable { get; set; }
    }
}
