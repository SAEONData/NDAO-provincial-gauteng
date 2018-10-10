using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public class Goal5 : IGoal
    {
        public Guid Id { get; set; }

        public int TechnologyAwareness { get; set; }
        public string EvidenceLink { get; set; }
        public int TotalBudget { get; set; }
        public int BudgetDuration { get; set; }
        public string FundingAgency { get; set; }
        public string PartneringDepartments { get; set; }
        public string Status { get; set; }

        //Shared fields
        public string Created { get; set; }
        public string CreateUserId { get; set; }
        public string LastUpdated { get; set; }
        public string LastUpdateUserId { get; set; }

        //public string MetadataLink { get; set; }
    }
}
