using System;
using System.Collections.Generic;
using System.Text;

namespace QualificationWork.DTO.Dtos
{
    public class PaginationRequest
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string Search { get; set; }
    }
}
