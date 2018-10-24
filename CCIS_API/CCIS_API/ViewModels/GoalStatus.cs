using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.ViewModels
{
    public class GoalStatus
    {
        public Guid Id { get; set; }
        public int Type { get; set; }
        public int Year { get; set; }
        public string Status { get; set; }
        public string Link { get; set; }
    }
}
