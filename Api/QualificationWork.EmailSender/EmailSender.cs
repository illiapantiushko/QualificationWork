using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.EmailSender
{
    public interface IEmailSender
    {
        void SendEmail(string fromAddress, string toAddress, string subject, string message);
    }

	public class EmailSender : IEmailSender
	{

		private readonly EmailSettings settings;

		public EmailSender(IOptions<EmailSettings> settings)
		{
			this.settings = settings.Value;
		}
		public void SendEmail(string fromAddress, string toAddress, string subject, string body)
		{
			var email = new MimeMessage();

			email.From.Add(MailboxAddress.Parse(fromAddress));

			email.To.Add(MailboxAddress.Parse(toAddress));

			email.Subject = subject;

			email.Body = new TextPart(TextFormat.Html) { Text = body };

			using var smtp = new MailKit.Net.Smtp.SmtpClient();

			smtp.Connect(settings.Host, int.Parse(settings.Port), SecureSocketOptions.StartTls);

			smtp.Authenticate(settings.Username, settings.Password);

			smtp.Send(email);

			smtp.Disconnect(true);

		}
	}
}
