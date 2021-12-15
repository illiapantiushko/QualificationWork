using Microsoft.EntityFrameworkCore;
using QualificationWork.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QualificationWork.DAL.Query
{
  public  class UserQuery
    {
        private readonly ApplicationContext context;

       
        public UserQuery(ApplicationContext context)
        {
            this.context = context;
          
        }

        public async Task<List<ApplicationUser>> GetUsers()
        {
            var data = await context.Users
                              .ToListAsync();
            return data;
        }



        public async Task<List<TimeTable>> GetTimeTable()
        {
            var data = await context.TimeTable
                              .ToListAsync();
            return data;
        }
    }
}
