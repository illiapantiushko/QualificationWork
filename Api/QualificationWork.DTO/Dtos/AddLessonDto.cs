using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DTO.Dtos
{
   public class AddLessonDto
    {
       public long SubjectId { get; set; }
       public int LessonNumber { get; set; }
       public DateTime Date { get; set; }
    }
}
