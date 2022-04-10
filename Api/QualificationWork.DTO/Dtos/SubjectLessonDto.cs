using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DTO.Dtos
{
  public class SubjectLessonsDto<T>
    {
        public string SubjectName { get; set; }
        public List<T> Lessons { get; set; }

        public SubjectLessonsDto(string subjectName, List<T> lessons) 
        {
            this.SubjectName = subjectName;
            this.Lessons = lessons;
        }
    }
}
