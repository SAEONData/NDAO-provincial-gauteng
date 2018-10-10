using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public class Goal9 : IGoal
    {
        public Guid Id { get; set; }

        public int Practices { get; set; }
        public string EvidenceLink { get; set; }
        public string Status { get; set; }
        public int RegionId { get; set; }

        public string Created { get; set; }
        public string CreateUserId { get; set; }
        public string LastUpdated { get; set; }
        public string LastUpdateUserId { get; set; }
    }
}
