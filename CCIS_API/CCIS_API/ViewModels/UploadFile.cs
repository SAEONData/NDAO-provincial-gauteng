using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.ViewModels
{
    public class UploadFile
    {
        public string FileName { get; set; }
        public string Base64Data { get; set; }
        public string MimeType { get; set; }
    }
}

