using NDAO_API.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NDAO_API.Interfaces
{
    public interface IFileManager
    {
        FileDetails UploadFile(UploadFile fileData);
        bool RemoveFile(UploadFile fileData);
        void RemoveAllFiles();

    }
}
