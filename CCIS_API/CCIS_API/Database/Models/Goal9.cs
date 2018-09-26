using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public class Goal9
    {
        public Guid Id { get; set; }

        public int NonClimateChange { get; set; }
        public string EvidenceLink { get; set; }

        public string MetadataLink { get; set; }
    }
}
