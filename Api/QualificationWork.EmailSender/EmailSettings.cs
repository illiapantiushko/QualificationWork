﻿using System;

namespace QualificationWork.EmailSender
{
    public class EmailSettings
    {
        public string Host { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Port { get; set; }
        public string ConfirmEmail { get; set; }
        public string SenderEmail { get; set; }
    }
}
