using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DTO.Dtos
{
   public class UpdateUserScoreDto
    {
        public long Id { get; set; }
        public int LessonNumber { get; set; }
        public int Score { get; set; }
    }
}
