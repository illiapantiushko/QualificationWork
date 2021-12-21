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


    public class UserValidator : AbstractValidator<UserDto>
    {
        private const string validationUserName = "User Name required field";
        private const string validationPassword = "Password must be greater than 6 characters and less than 10";
        private const string validationAge = "Password must be greater than 6 characters and less than 10";

        public UserValidator()
        {
            RuleFor(x => x.UserName).NotNull().WithMessage(validationUserName);
            RuleFor(x => x.UserEmail).NotNull().Length(6, 10).WithMessage(validationPassword);
            RuleFor(x => x.Age).NotNull().WithMessage(validationAge);
  
        }

    }
}
