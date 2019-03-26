using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NDAO_API.Database.Models
{
    public class Question
    {
        public Guid Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }

        public Goal Goal { get; set; }
    }
}
