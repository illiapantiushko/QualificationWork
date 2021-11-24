using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Models
{
    public class Topic
    {
        public long Id { get; set; }
        public string TopicName { get; set; }

        public Faculty Faculty { get; set; }
        public bool IsActive { get; set; }

        public ICollection<UserTopic> UserTopics { get; set; }
    }
}
