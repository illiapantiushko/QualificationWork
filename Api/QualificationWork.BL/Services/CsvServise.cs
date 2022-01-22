using CsvHelper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using QualificationWork.DAL;
using QualificationWork.DAL.Models;
using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QualificationWork.BL.Services
{
    public class CsvService
    {
        private readonly ApplicationContext context;

        private readonly IHostingEnvironment hostingEnvironment;

        public CsvService(ApplicationContext context, IHostingEnvironment hostingEnvironment)
        {
            this.context = context;
            this.hostingEnvironment = hostingEnvironment;
        }

        public List<ApplicationUser> ReadCSVFile(string location)
        {
            try
            {
                using (var reader = new StreamReader(location, Encoding.Default))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    //csv.Context.RegisterClassMap<User>();
                    var records = csv.GetRecords<ApplicationUser>().ToList();
                    return records;
                }
            }

            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public void WriteCSVFile(string path)
        {
            var users = context.Users.ToList();

            var writer = new StreamWriter(path);
            var csvwriter = new CsvWriter(writer, CultureInfo.InvariantCulture);

            csvwriter.WriteRecords(users);
            csvwriter.Dispose();
            writer.Dispose();
        }

        public async Task<List<UserDto>> Import(IFormFile file) {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var list = new List<UserDto>();
            using (var stream = new MemoryStream()) {
                await file.CopyToAsync(stream);
                using (var package = new ExcelPackage(stream)) {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    var rowcount = worksheet.Dimension.Rows;
                    for (int row = 2; row <= rowcount; row++)
                    {
                        list.Add(new UserDto
                        {
                            UserName= worksheet.Cells[row, 1].Value.ToString().Trim(),
                            UserEmail = worksheet.Cells[row, 2].Value.ToString().Trim(),
                            Age = Convert.ToInt32(worksheet.Cells[row, 3].Value.ToString().Trim()),
                            ІsContract = Convert.ToBoolean( worksheet.Cells[row, 4].Value.ToString().Trim()),
                        });
                    }
                }
            }

            return list;
           }

        public Stream ExportToExcel()
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            var subjects = context.Subjects.ToList();

            var stream = new MemoryStream();
            using (var xlPackage = new ExcelPackage(stream))
            {
                var worksheet = xlPackage.Workbook.Worksheets.Add("Users");
                var namedStyle = xlPackage.Workbook.Styles.CreateNamedStyle("HyperLink");
                namedStyle.Style.Font.UnderLine = true;
                namedStyle.Style.Font.Color.SetColor(Color.Blue);
                const int startRow = 5;
                var row = startRow;

                worksheet.Cells["A1"].Value = "Name";
                worksheet.Cells["B1"].Value = "Активний";
                worksheet.Cells["C1"].Value = "Кредити";
                worksheet.Cells["A1:C1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["A1:C1"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(184, 204, 228));
                worksheet.Cells["A1:C1"].Style.Font.Bold = true;

                row =2;

                foreach (var subject in subjects)
                {
                    worksheet.Cells[row, 1].Value = subject.SubjectName;
                    worksheet.Cells[row, 2].Value = subject.IsActive;
                    worksheet.Cells[row, 3].Value = subject.AmountCredits;

                    row++;
                }
                // set some core property values
                xlPackage.Workbook.Properties.Title = "User List";
                xlPackage.Workbook.Properties.Author = "Mohamad Lawand";
                xlPackage.Workbook.Properties.Subject = "User List";
                // save the new spreadsheet
                xlPackage.Save();
                // Response.Clear();
            }
            stream.Position = 0;
            return stream;
        }


        public Stream ExportToExcelUserTimeTable(long subjectId)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            var userList = context.Users.Where(x => x.UserSubjects.Any(y => y.SubjectId == subjectId))                               
         .ToList();
            
                

            var stream = new MemoryStream();
            using (var xlPackage = new ExcelPackage(stream))
            {
                var worksheet = xlPackage.Workbook.Worksheets.Add("Users");
                var namedStyle = xlPackage.Workbook.Styles.CreateNamedStyle("HyperLink");
                namedStyle.Style.Font.UnderLine = true;
                namedStyle.Style.Font.Color.SetColor(Color.Blue);
                const int startRow = 5;
                var row = startRow;

                worksheet.Cells["A1"].Value = "UserName";
                worksheet.Cells["B1"].Value = "Email";
                worksheet.Cells["C1"].Value = "Age";
                worksheet.Cells["D1"].Value = "LessonNumber";
                worksheet.Cells["E1"].Value = "IsPresent";
                worksheet.Cells["F1"].Value = "Score";
                worksheet.Cells["G1"].Value = "LessonDate";
              
                worksheet.Cells["A1:G1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["A1:G1"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(184, 204, 228));
                worksheet.Cells["A1:G1"].Style.Font.Bold = true;
                worksheet.Cells["A1:G1"].AutoFitColumns();

                row = 2;

                foreach (var user in userList)
                {
                    var userTimeTables = context.TimeTable.Where(x => x.UserSubject.UserId == user.Id).ToList();


                    foreach (var timeTable in userTimeTables) {

                        worksheet.Cells[row, 1].Value = user.UserName;
                        worksheet.Cells[row, 2].Value = user.Email;
                        worksheet.Cells[row, 3].Value = user.Age;
                        worksheet.Cells[row, 4].Value = timeTable.LessonNumber;
                        worksheet.Cells[row, 5].Value = !timeTable.IsPresent? "Відсутній":"Присутній";
                        worksheet.Cells[row, 6].Value = timeTable.Score;
                        worksheet.Cells[row, 7].Style.Numberformat.Format = "m/d/yy h:mm";
                        worksheet.Cells[row, 7].Value = timeTable.LessonDate;


                    }

                    row++;
                }
                // set some core property values
                xlPackage.Workbook.Properties.Title = "User List";
                xlPackage.Workbook.Properties.Author = "Mohamad Lawand";
                xlPackage.Workbook.Properties.Subject = "User List";
                // save the new spreadsheet
                xlPackage.Save();
                // Response.Clear();
            }
            stream.Position = 0;
            return stream;
        }


    }
}
