using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public class Goal3
    {
        public Guid Id { get; set; }

        public int DisseminationUtilisation { get; set; }
        public int MonitoringForcsting { get; set; }
        public decimal TotalBudget { get; set; }
        public string BudgetDuration { get; set; }
        public string FundingAgency { get; set; }
        public string PartneringDepartments { get; set; }
        public int Status { get; set; }

        public string MetadataLink { get; set; }
    }
}
