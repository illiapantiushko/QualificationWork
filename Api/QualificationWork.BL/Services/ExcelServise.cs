using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using QualificationWork.DAL;
using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using QualificationWork.DAL.Query;
using System.Linq;
using System.Data.Entity;
using QualificationWork.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace QualificationWork.BL.Services
{
    public class ExcelService
    {
        private readonly ApplicationContext context;
        private readonly GroupQuery groupQuery;

        public ExcelService(ApplicationContext context, GroupQuery groupQuery)
        {
            this.context = context;
            this.groupQuery = groupQuery;
        }

        public async Task<List<UserFromExcelDto>> Import(IFormFile file)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var list = new List<UserFromExcelDto>();
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                using (var package = new ExcelPackage(stream))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    var rowcount = worksheet.Dimension.Rows;
                    for (int row = 2; row <= rowcount; row++)
                    {
                        list.Add(new UserFromExcelDto
                        {
                            UserName = worksheet.Cells[row, 1].Value.ToString().Trim(),
                            UserEmail = worksheet.Cells[row, 2].Value.ToString().Trim(),
                            Age = Convert.ToInt32(worksheet.Cells[row, 3].Value.ToString().Trim()),
                            ІsContract = Convert.ToBoolean(worksheet.Cells[row, 4].Value.ToString().Trim())
                        });
                    }
                }
            }
            return list;
        }

        public async Task<List<GroupDto>> ImportFacultyGroups(IFormFile file)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var listGroup = new List<GroupDto>();
            var listFaculty = new List<FacultyDto>();

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                using (var package = new ExcelPackage(stream))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    var rowcount = worksheet.Dimension.Rows;
                    for (int row = 2; row <= rowcount; row++)
                    {
                        listGroup.Add(new GroupDto
                        {
                            GroupName = worksheet.Cells[row, 1].Value.ToString().Trim()
                        });

                        listFaculty.Add(new FacultyDto
                        {
                            FacultyName = worksheet.Cells[row, 2].Value.ToString().Trim()
                        });
                    }
                }
            }

            foreach (var group in listGroup)
            {


                foreach (var faculty in listFaculty)
                {

                    var facultyData = context.Faculties.FirstOrDefault(x => x.FacultyName == faculty.FacultyName);
                    var dataGroup = new Group
                    {
                        GroupName = group.GroupName,
                        FacultyId = facultyData.Id
                    };

                    await context.AddAsync(dataGroup);
                }

            }
            await context.SaveChangesAsync();
            return listGroup;
        }

        public async Task<List<SubjectDto>> ImportStusentSubject(IFormFile file)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var listSubject = new List<SubjectDto>();
            var listUser = new List<UserDto>();

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                using (var package = new ExcelPackage(stream))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    var rowcount = worksheet.Dimension.Rows;
                    for (int row = 2; row <= rowcount; row++)
                    {
                        listUser.Add(new UserDto
                        {
                            UserName = worksheet.Cells[row, 1].Value.ToString().Trim()
                        });

                        listSubject.Add(new SubjectDto
                        {
                            SubjectName = worksheet.Cells[row, 2].Value.ToString().Trim()
                        });
                    }
                }
            }

            foreach (var user in listUser)
            {
                var userData = context.Users.FirstOrDefault(x => x.UserName == user.UserName);


                foreach (var subject in listSubject)
                {

                    var subjectData = context.Subjects.FirstOrDefault(x => x.SubjectName == subject.SubjectName);
                    var data = new TimeTable
                    {
                        UserId = userData.Id,
                        SubjectId = subjectData.Id,
                        IsPresent = false,
                        Score = 0,
                        LessonDate = DateTime.Now,
                        LessonNumber = 1,
                    };

                    await context.AddAsync(data);
                }

            }
            await context.SaveChangesAsync();
            return listSubject;
        }

        public async Task<List<Faculty>> ImportFaculty(IFormFile file)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var listFaculty = new List<Faculty>();
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                using (var package = new ExcelPackage(stream))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    var rowcount = worksheet.Dimension.Rows;
                    for (int row = 2; row <= rowcount; row++)
                    {
                        listFaculty.Add(new Faculty
                        {
                            FacultyName = worksheet.Cells[row, 1].Value.ToString().Trim()
                        });
                    }
                }
            }

            foreach (var faculty in listFaculty)
            {
                var chekFaculty = context.Faculties.FirstOrDefault(x => x.FacultyName == faculty.FacultyName);

                if (chekFaculty == null)
                {
                    await context.AddAsync(faculty);
                }
            }
            await context.SaveChangesAsync();

            return listFaculty;
        }
        public async Task<List<Subject>> ImportSubject(IFormFile file)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var listSubjects = new List<Subject>();
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                using (var package = new ExcelPackage(stream))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    var rowcount = worksheet.Dimension.Rows;
                    for (int row = 2; row <= rowcount; row++)
                    {
                        listSubjects.Add(new Subject
                        {
                            SubjectName = worksheet.Cells[row, 1].Value.ToString().Trim(),
                            IsActive = Convert.ToBoolean(worksheet.Cells[row, 2].Value.ToString().Trim()),
                            AmountCredits = Convert.ToInt32(worksheet.Cells[row, 3].Value.ToString().Trim()),
                            SubjectСlosingDate = Convert.ToDateTime(worksheet.Cells[row, 4].Value.ToString().Trim())
                        });
                    }
                }
            }

            foreach (var subject in listSubjects)
            {
                var chekSubject = context.Subjects.FirstOrDefault(x => x.SubjectName == subject.SubjectName);

                if (chekSubject == null)
                {
                    await context.AddAsync(subject);
                }
            }
            await context.SaveChangesAsync();

            return listSubjects;
        }

        public async Task<Stream> ExportToExcelBySubject(long subjectId)
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

                var row = 3;

                var usersTimeTables = await groupQuery.GetTimeTableBySubject(subjectId);

                foreach (var timeTable in usersTimeTables)
                {
                    worksheet.Cells[row, 1].Value = timeTable.User.UserName;
                    worksheet.Cells[row, 2].Value = timeTable.User.Email;
                    worksheet.Cells[row, 3].Value = timeTable.LessonNumber;
                    worksheet.Cells[row, 4].Value = !timeTable.IsPresent ? "Відсутній" : "Присутній";
                    worksheet.Cells[row, 5].Value = timeTable.Score;
                    worksheet.Cells[row, 6].Style.Numberformat.Format = "m/d/yy h:mm";
                    worksheet.Cells[row, 6].Value = timeTable.LessonDate;
                    row++;
                }

                var listUniqueTimetable = new List<TimeTable>();

                foreach (var item in usersTimeTables)
                {
                    var leson = listUniqueTimetable.FirstOrDefault(x => x.UserId == item.UserId);

                    if (leson == null)
                    {
                        listUniqueTimetable.Add(item);
                    }
                }

                var rowCount = 2;
                var resultSheet = xlPackage.Workbook.Worksheets.Add("Підсумки");
                resultSheet.Cells["A1"].Value = "І'мя";
                resultSheet.Cells["B1"].Value = "Оцінка";
                resultSheet.Cells["A1:B1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                resultSheet.Cells["A1:B1"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(24, 159, 24));
                resultSheet.Cells["A1:B2"].Style.Font.Bold = true;
                foreach (var timeTable in listUniqueTimetable)
                {
                    var totaCount = 0;

                    var userTimeTable = context.TimeTable
                                               .Where(x => x.UserId == timeTable.UserId)
                                               .Where(x => x.SubjectId == subjectId).ToList();

                    foreach (var i in userTimeTable)
                    {
                        totaCount += i.Score;
                    }

                    resultSheet.Cells[rowCount, 1].Value = timeTable.User.UserName;
                    resultSheet.Cells[rowCount, 2].Value = totaCount;
                    rowCount++;
                }

                xlPackage.Workbook.Properties.Title = "User List";
                xlPackage.Workbook.Properties.Author = "Mohamad Lawand";
                xlPackage.Workbook.Properties.Subject = "User List";
                xlPackage.Save();
            }
            stream.Position = 0;
            return stream;
        }

        public async Task<Stream> ExportToExcelByUser(long userId)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            var stream = new MemoryStream();
            using (var xlPackage = new ExcelPackage(stream))
            {
                var worksheet = xlPackage.Workbook.Worksheets.Add("Звіт");
                var namedStyle = xlPackage.Workbook.Styles.CreateNamedStyle("HyperLink");
                namedStyle.Style.Font.UnderLine = true;

                worksheet.Cells["A1"].Value = "Предмет";
                worksheet.Cells["B1"].Value = "Номер заняття";
                worksheet.Cells["C1"].Value = "Присутність";
                worksheet.Cells["D1"].Value = "Бал";
                worksheet.Cells["E1"].Value = "Дата заняття";
               
                worksheet.Cells["A1:E1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["A1:E1"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(24, 159, 24));
                worksheet.Cells["A1:E1"].Style.Font.Bold = true;
                worksheet.Cells["A1:K20"].AutoFitColumns();

                var row = 2;

                var userTimeTable = await groupQuery.GetTimeTableByUser(userId);

                foreach (var timeTable in userTimeTable)
                {
                    worksheet.Cells[row, 1].Value = timeTable.Subject.SubjectName;
                    worksheet.Cells[row, 2].Value = timeTable.LessonNumber;
                    worksheet.Cells[row, 3].Value = !timeTable.IsPresent ? "Відсутній" : "Присутній";
                    worksheet.Cells[row, 4].Value = timeTable.Score;
                    worksheet.Cells[row, 5].Style.Numberformat.Format = "m/d/yy h:mm";
                    worksheet.Cells[row, 5].Value = timeTable.LessonDate;
                    row++;
                }

                var listUniqueTimetable = new List<TimeTable>();

                foreach (var item in userTimeTable)
                {
                    var leson = listUniqueTimetable.FirstOrDefault(x => x.SubjectId == item.SubjectId);

                    if (leson == null)
                    {
                        listUniqueTimetable.Add(item);
                    }
                }
                var resultSheet = xlPackage.Workbook.Worksheets.Add("Підсумки");
                resultSheet.Cells["A1"].Value = "Предмет";
                resultSheet.Cells["B1"].Value = "Оцінка";
                resultSheet.Cells["A1"].Value = "І'мя";
                resultSheet.Cells["B1"].Value = "Оцінка";
                resultSheet.Cells["A1:B1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                resultSheet.Cells["A1:B1"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(24, 159, 24));
                resultSheet.Cells["A1:B2"].Style.Font.Bold = true;
                var rowCount = 2;
                foreach (var timeTable in listUniqueTimetable)
                {
                    var totaCount = 0;

                    var subjectTimeTable = context.TimeTable
                                               .Where(x => x.UserId == userId)
                                               .Where(x => x.SubjectId == timeTable.SubjectId).ToList();

                    foreach (var i in subjectTimeTable)
                    {
                        totaCount += i.Score;
                    }

                    resultSheet.Cells[rowCount, 1].Value = timeTable.Subject.SubjectName;
                    resultSheet.Cells[rowCount, 2].Value = totaCount;
                    rowCount++;
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
