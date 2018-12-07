using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.ViewModels
{
    public class FileDetails
    {
        public string Id { get; set; }
        public string Link { get; set; }
        public long? Version { get; set; }

        public FileDetails()
        {
            Id = "";
            Link = "";
            Version = 0;
        }
    }
}
