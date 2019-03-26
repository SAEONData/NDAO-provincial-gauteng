using NDAO_API.Extensions;
using NDAO_API.Interfaces;
using NDAO_API.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace NDAO_API.Classes
{
    public class LocalFileManager : IFileManager
    {
        private const string localStorageFolder = "Uploads";

        public void RemoveAllFiles()
        {
            try
            {
                if (Directory.Exists(localStorageFolder))
                {
                    Directory.Delete(localStorageFolder, true);
                }
            }
            catch (Exception ex)
            {
                HelperExtensions.LogInternalError(ex);
                throw ex;
            }
        }

        public bool RemoveFile(UploadFile fileData)
        {
            bool result = false;

            try
            {
                
            }
            catch (Exception ex)
            {
                HelperExtensions.LogInternalError(ex);
                throw ex;
            }

            return result;
        }

        public FileDetails UploadFile(UploadFile fileData)
        {
            try
            {
                //Create dir if not there
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", "Uploads");
                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                //Save file
                var sourceFileInfo = new FileInfo(fileData.FileName);
                var destFileInfo = new FileInfo(Path.Combine(filePath, $"{fileData.UID}_{DateTime.Now.ToString("yyyyMMddHHmmss")}_{sourceFileInfo.Name}"));
                byte[] fileBytes = Convert.FromBase64String(fileData.Base64Data);
                File.WriteAllBytes(destFileInfo.FullName, fileBytes);

                //Result
                return new FileDetails()
                {
                    Id = fileData.UID,
                    Link = $"{fileData.ApiBaseUrl}/Uploads/{destFileInfo.Name}",
                    Version = (destFileInfo.Directory.GetFiles().Count(f => f.FullName.Contains(fileData.UID)) + 1)
                };
            }
            catch (Exception ex)
            {
                HelperExtensions.LogInternalError(ex);
                throw ex;
            }
        }
    }
}
