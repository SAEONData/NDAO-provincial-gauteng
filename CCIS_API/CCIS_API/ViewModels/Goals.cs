using CCIS_API.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.ViewModels
{
    public class Goals
    {
        public Guid Id { get; set; }

        public Goal1[] Goal1 { get; set; }
        public Goal2[] Goal2 { get; set; }
        public Goal3[] Goal3 { get; set; }
        public Goal4[] Goal4 { get; set; }
        public Goal5[] Goal5 { get; set; }
        public Goal6[] Goal6 { get; set; }
        public Goal7[] Goal7 { get; set; }
        public Goal8[] Goal8 { get; set; }
        public Goal9[] Goal9 { get; set; }
    }
}
