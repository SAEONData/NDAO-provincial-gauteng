using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public class Goal1
    {
        public Guid Id { get; set; }

        public string DocumentLink { get; set; }
        public bool HasAssessment { get; set; }
        public long LastUpdateDate { get; set; }
        public int Status { get; set; }

        public string MetadataLink { get; set; }
    }
}
