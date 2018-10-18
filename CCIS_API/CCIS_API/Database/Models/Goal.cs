using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public class Goal
    {
        public Guid Id { get; set; }
        public int Type { get; set; }
        public string CreateDate { get; set; }
        public Guid? CreateUser { get; set; }
        public string UpdateDate { get; set; }
        public Guid? UpdateUser { get; set; }
        public string Status { get; set; }

        public virtual ICollection<Question> Questions { get; set; }
    }
}
