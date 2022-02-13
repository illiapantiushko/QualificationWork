using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DTO.Dtos
{
   public class Pagination<TData>
    {
        public int TotalCount { get; set; }

        public List<TData> Data { get; set; }

        public Pagination(int totalCount, List<TData> data)
        {
            this.TotalCount = totalCount;
            this.Data = data;
        }
    }
}
