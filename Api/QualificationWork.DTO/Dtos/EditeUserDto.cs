using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DTO.Dtos
{
   public class EditeUserDto
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public int Age { get; set; }
        public bool ІsContract { get; set; }
        public List<string> Roles { get; set; }
    }
}
