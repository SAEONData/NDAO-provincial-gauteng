using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public class Goal2
    {
        public Guid Id { get; set; }

        public bool DedicatedChampion { get; set; }
        public string DocumentLink { get; set; }
        public bool DedicatedFunding { get; set; }
        public decimal TotalBudget { get; set; }
        public string FundingDuration { get; set; }
        public string PartneringDepartments { get; set; }
        public int IncludedInForums { get; set; }

        public string MetadataLink { get; set; }
    }
}
