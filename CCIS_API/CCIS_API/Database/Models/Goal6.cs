using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Models
{
    public class Goal6
    {
        public Guid Id { get; set; }

        public int IncludedInForums { get; set; }

        public string MetadataLink { get; set; }
    }
}
