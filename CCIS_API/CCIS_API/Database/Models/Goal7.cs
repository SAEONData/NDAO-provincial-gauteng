using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public class Goal7 : IGoal
    {
        public Guid Id { get; set; }

        public int ResultingChange { get; set; }
        public string EvidenceLink { get; set; }

        //Shared fields
        public string Created { get; set; }
        public string CreateUserId { get; set; }
        public string LastUpdated { get; set; }
        public string LastUpdateUserId { get; set; }

        //public string MetadataLink { get; set; }
    }
}
