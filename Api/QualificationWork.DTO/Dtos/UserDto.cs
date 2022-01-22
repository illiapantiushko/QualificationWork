using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DTO.Dtos
{
    public class UserDto
    {
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public int Age { get; set; }
        public bool ІsContract { get; set; }

    }


   
}
