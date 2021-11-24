using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Models
{
    public class TimeTable
    {
        public long Id { get; set; }
        public long UserTopicId { get; set; }
        public UserTopic UserTopic { get; set; }
        public DateTime TopicDate { get; set; }
        public bool IsPresent { get; set; }
        public int TopicNumber { get; set; }
    }
}
