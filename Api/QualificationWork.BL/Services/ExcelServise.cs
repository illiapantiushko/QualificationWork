using CsvHelper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using QualificationWork.DAL;
using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace QualificationWork.BL.Services
{
    public class ExcelService
    {
        private readonly ApplicationContext context;

        private readonly IHostingEnvironment hostingEnvironment;

        public ExcelService(ApplicationContext context, IHostingEnvironment hostingEnvironment)
        {
            this.context = context;
            this.hostingEnvironment = hostingEnvironment;
        }

        //public List<ApplicationUser> ReadCSVFile(string location)
        //{
        //    try
        //    {
        //        using (var reader = new StreamReader(location, Encoding.Default))
        //        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
        //        {
        //            //csv.Context.RegisterClassMap<User>();
        //            var records = csv.GetRecords<ApplicationUser>().ToList();
        //            return records;
        //        }
        //    }

        //    catch (Exception e)
        //    {
        //        throw new Exception(e.Message);
        //    }
        //}

        //public void WriteCSVFile(string path)
        //{
        //    var users = context.Users.ToList();

        //    var writer = new StreamWriter(path);
        //    var csvwriter = new CsvWriter(writer, CultureInfo.InvariantCulture);

        //    csvwriter.WriteRecords(users);
        //    csvwriter.Dispose();
        //    writer.Dispose();
        //}

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

        public Stream ExportToExcelUserTimeTable(long subjectId)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            var subject = context.Subjects.FirstOrDefault(x => x.Id == subjectId);
            
            var stream = new MemoryStream();
            using (var xlPackage = new ExcelPackage(stream))
            {
                var worksheet = xlPackage.Workbook.Worksheets.Add(subject.SubjectName);
                var namedStyle = xlPackage.Workbook.Styles.CreateNamedStyle("HyperLink");
                namedStyle.Style.Font.UnderLine = true;
                namedStyle.Style.Font.Color.SetColor(Color.Blue);

                worksheet.Cells["A1"].Value = subject.SubjectName;
                worksheet.Cells["A1"].Style.Font.Bold = true;
                worksheet.Cells["A2"].Value = "І'мя";
                worksheet.Cells["B2"].Value = "Email";
                worksheet.Cells["C2"].Value = "Номер заняття";
                worksheet.Cells["D2"].Value = "Присутність";
                worksheet.Cells["E2"].Value = "Бал";
                worksheet.Cells["F2"].Value = "Дата заняття";
              
                worksheet.Cells["A1:F2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["A1:F1"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(24, 159, 24));
                worksheet.Cells["A2:F2"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(184, 204, 228));
                worksheet.Cells["A2:F2"].Style.Font.Bold = true;
                worksheet.Cells["A1:K20"].AutoFitColumns();

                var row = 3;

                var userList = context.Users.Where(x => x.UserSubjects.Any(y => y.SubjectId == subjectId)).ToList();

                foreach (var user in userList)
                {
                    var userTimeTables = context.TimeTable.Where(x => x.UserSubject.UserId == user.Id).ToList();

                    foreach (var timeTable in userTimeTables) {

                        worksheet.Cells[row, 1].Value = user.UserName;
                        worksheet.Cells[row, 2].Value = user.Email;
                        worksheet.Cells[row, 3].Value = timeTable.LessonNumber;
                        worksheet.Cells[row, 4].Value = !timeTable.IsPresent? "Відсутній":"Присутній";
                        worksheet.Cells[row, 5].Value = timeTable.Score;
                        worksheet.Cells[row, 6].Style.Numberformat.Format = "m/d/yy h:mm";
                        worksheet.Cells[row, 6].Value = timeTable.LessonDate;
                        row++;
                    }
                }
                xlPackage.Workbook.Properties.Title = "User List";
                xlPackage.Workbook.Properties.Author = "Mohamad Lawand";
                xlPackage.Workbook.Properties.Subject = "User List";
                xlPackage.Save();
            }
            stream.Position = 0;
            return stream;
        }
    }
}
