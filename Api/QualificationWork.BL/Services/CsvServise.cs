using CsvHelper;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using QualificationWork.DAL;
using QualificationWork.DAL.Models;
using QualificationWork.DTO.Dtos;
using System;
using System.Collections.Generic;
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

        public CsvService(ApplicationContext context)
        {
            this.context = context;
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

    }
}
