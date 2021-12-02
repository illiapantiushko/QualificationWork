using CsvHelper;
using QualificationWork.DAL;
using QualificationWork.DAL.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;

namespace QualificationWork.BL.Services
{
    public class CsvService
    {
        private readonly ApplicationContext context;

        public CsvService(ApplicationContext context)
        {
            this.context = context;
        }

        public List<User> ReadCSVFile(string location)
        {
            try
            {
                using (var reader = new StreamReader(location, Encoding.Default))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    //csv.Context.RegisterClassMap<User>();
                    var records = csv.GetRecords<User>().ToList();
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
    }
}
