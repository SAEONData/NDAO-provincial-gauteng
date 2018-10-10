using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public class StatusHistory
    {
        public int Id { get; set; }

        public int GoalType { get; set; } // 1 - 9
        public int GoalId { get; set; } // Ref to GoalId

        public string Status { get; set; }
        public DateTime SnapshotDate { get; set; }
    }
}
