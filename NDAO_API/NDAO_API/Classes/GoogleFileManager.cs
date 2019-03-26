using NDAO_API.Database.Contexts;
using NDAO_API.Extensions;
using NDAO_API.Interfaces;
using NDAO_API.ViewModels;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Google.Apis.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace NDAO_API.Classes
{
    public class GoogleFileManager : IFileManager
    {
        private IConfiguration _config { get; set; }
        private DriveService _service { get; set; }

        public GoogleFileManager(IConfiguration config)
        {
            _config = config;

            //Authenticate
            string keyFilePath = _config.GetSection("GAPI")["KeyFileName"];
            string serviceAccountEmail = _config.GetSection("GAPI")["ServiceAccountEmail"];
            _service = AuthenticateServiceAccount(serviceAccountEmail, keyFilePath);
        }

        public FileDetails UploadFile(UploadFile fileData)
        {
            //Authenticate
            string keyFilePath = _config.GetSection("GAPI")["KeyFileName"];
            string serviceAccountEmail = _config.GetSection("GAPI")["ServiceAccountEmail"];
            _service = AuthenticateServiceAccount(serviceAccountEmail, keyFilePath);

            FileDetails result = new FileDetails();

            try
            {
                byte[] fileBytes = Convert.FromBase64String(fileData.Base64Data);

                //Prep for upload
                var fileMetadata = new Google.Apis.Drive.v3.Data.File()
                {
                    Name = fileData.UID,
                    MimeType = fileData.MimeType
                };

                //Check if file exists
                var fileId = SearchByName(fileData.UID);
                if (fileId != "")
                {
                    //Update file
                    FilesResource.UpdateMediaUpload request;
                    using (var stream = new MemoryStream(fileBytes))
                    {
                        request = _service.Files.Update(fileMetadata, fileId, stream, fileData.MimeType);
                        request.Fields = "id,name,webContentLink,version";
                        request.Upload();
                    }

                    //Get file details
                    var file = request.ResponseBody;

                    //Set result
                    result.Id = file.Id;
                    result.Link = file.WebContentLink;
                    result.Version = file.Version;
                }
                else
                {
                    //Upload file
                    FilesResource.CreateMediaUpload request;
                    using (var stream = new MemoryStream(fileBytes))
                    {
                        request = _service.Files.Create(fileMetadata, stream, fileData.MimeType);
                        request.Fields = "id,name,webContentLink,version";
                        request.Upload();
                    }

                    //Get file details
                    var file = request.ResponseBody;

                    //Add 'public' permissions
                    Permission perm = new Permission();
                    perm.Type = "anyone";
                    perm.Role = "reader";
                    _service.Permissions.Create(perm, file.Id).Execute(); //Creating Permission after file/folder creation.

                    //Set result
                    result.Id = file.Id;
                    result.Link = file.WebContentLink;
                    result.Version = file.Version;
                }
            }
            catch (Exception ex)
            {
                HelperExtensions.LogInternalError(ex);
                throw ex;
            }

            return result;
        }

        public bool RemoveFile(UploadFile fileData)
        {
            //Authenticate
            string keyFilePath = _config.GetSection("GAPI")["KeyFileName"];
            string serviceAccountEmail = _config.GetSection("GAPI")["ServiceAccountEmail"];
            _service = AuthenticateServiceAccount(serviceAccountEmail, keyFilePath);

            var result = false;

            try
            {
                //Get the file-Id
                var fileId = SearchByName(fileData.UID);

                //Remove the file
                if (fileId != "")
                {
                    _service.Files.Delete(fileId).Execute();
                }

                result = true;
            }
            catch (Exception ex)
            {
                HelperExtensions.LogInternalError(ex);
                throw ex;
            }

            return result;
        }

        public void RemoveAllFiles()
        {
            //Authenticate
            string keyFilePath = _config.GetSection("GAPI")["KeyFileName"];
            string serviceAccountEmail = _config.GetSection("GAPI")["ServiceAccountEmail"];
            _service = AuthenticateServiceAccount(serviceAccountEmail, keyFilePath);

            //Find files
            FilesResource.ListRequest request = _service.Files.List();
            var fileList = request.Execute();

            foreach (var file in fileList.Files)
            {
                Console.WriteLine("DELETING: " + file.Id);
                _service.Files.Delete(file.Id).Execute();
            }
        }


        //Helper Functions
        private DriveService AuthenticateServiceAccount(string serviceAccountEmail, string keyFilePath)
        {
            try
            {
                if (!System.IO.File.Exists(keyFilePath))
                {
                    throw new FileNotFoundException($"KeyFile missing. ({keyFilePath})");
                }

                // These are the scopes of permissions you need. It is best to request only what you need and not all of them
                string[] scopes = new string[] { DriveService.Scope.Drive }; // View your Google Analytics data

                //Load json key
                GoogleCredential credential;
                using (var stream = new FileStream(keyFilePath, FileMode.Open, FileAccess.Read))
                {
                    credential = GoogleCredential.FromStream(stream).CreateScoped(scopes);
                }

                //Create the service
                DriveService service = new DriveService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = "CCIS_GAPI"
                });

                return service;
            }
            catch (Exception ex)
            {
                HelperExtensions.LogInternalError(ex);
                throw ex;
            }
        }

        private string SearchByName(string fileName)
        {
            string result = "";

            try
            {
                //Find file
                FilesResource.ListRequest request = _service.Files.List();
                request.Q = $"name='{fileName}' and trashed=false";
                //request.Fields = "id";
                //request.PageSize = 10;
                var fileList = request.Execute();

                //Get file id
                if (fileList.Files.Count > 0)
                {
                    result = fileList.Files[0].Id;
                }
            }
            catch (Exception ex)
            {
                HelperExtensions.LogInternalError(ex);
                throw ex;
            }

            return result;
        }
    }
}
