using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DTO.Dtos
{
    public class TimeTableDto
    {
        public long UserId { get; set; }
        public long SubjectId { get; set; }
        public int LessonNumber { get; set; }
        public bool IsPresent { get; set; }
        public int Score { get; set; }
        public DateTime LessonDate { get; set; }

        public long UserSubjectId { get; set; }
    }
}
