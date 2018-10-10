using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public interface IGoal
    {
        string Status { get; set; }
        int RegionId { get; set; }

        string Created { get; set; }
        string CreateUserId { get; set; }
        string LastUpdated { get; set; }
        string LastUpdateUserId { get; set; }
    }
}
