using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DTO.Dtos
{
   public class SubjectDto
    {
        public long Id { get; set; }
        public string SubjectName { get; set; }

        public bool IsActive { get; set; }

        public int AmountCredits { get; set; }

        public DateTime SubjectСlosingDate { get; set; }
    }
}
