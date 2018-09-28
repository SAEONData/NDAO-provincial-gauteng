using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public class Goal1 : IGoal
    {
        public Guid Id { get; set; }

        public string DocumentLink { get; set; }
        public bool HasAssessment { get; set; }
        public string DocLastUpdated { get; set; }

        //Shared fields
        public string Created { get; set; }
        public string CreateUserId { get; set; }
        public string LastUpdated { get; set; }
        public string LastUpdateUserId { get; set; }

        //public string MetadataLink { get; set; }
    }
}
