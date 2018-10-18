using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CCIS_API.Database.Contexts;
using CCIS_API.ViewModels;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Google.Apis.Services;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace CCIS_API.Controllers
{
    [Produces("application/json")]
    [EnableCors("CORSPolicy")]
    public class GoogleDriveController : ODataController
    {
        private SQLDBContext _context { get; }
        private IConfiguration _config { get; set; }
        private DriveService _service { get; set; }

        public GoogleDriveController(SQLDBContext context, IConfiguration config)
        {
            _context = context;
            _config = config;

            //Authenticate
            string keyFilePath = _config.GetSection("GAPI")["KeyFileName"];
            string serviceAccountEmail = _config.GetSection("GAPI")["ServiceAccountEmail"];
            _service = AuthenticateServiceAccount(serviceAccountEmail, keyFilePath);
        }

        [HttpPost]
        [ODataRoute("UploadFile")]
        [EnableCors("CORSPolicy")]
        [Authorize(Roles = "Contributor,Custodian,Configurator,SysAdmin")]
        public GoogleFile UploadFile([FromBody] UploadFile fileData)
        {
            //Authenticate
            string keyFilePath = _config.GetSection("GAPI")["KeyFileName"];
            string serviceAccountEmail = _config.GetSection("GAPI")["ServiceAccountEmail"];
            _service = AuthenticateServiceAccount(serviceAccountEmail, keyFilePath);

            GoogleFile result = new GoogleFile();

            try
            {
                byte[] fileBytes = Convert.FromBase64String(fileData.Base64Data);

                //Prep for upload
                //string fileDataBase64 = fileData.Base64Data.Replace($"data:{fileData.MimeType};base64,", "");
                var fileMetadata = new Google.Apis.Drive.v3.Data.File()
                {
                    Name = fileData.FileName,
                    MimeType = fileData.MimeType
                };

                //Check if file exists
                var fileId = SearchByName(fileData.FileName);
                if (fileId != "")
                {
                    //Update file
                    FilesResource.UpdateMediaUpload request;
                    using (var stream = new MemoryStream(fileBytes))
                    {
                        request = _service.Files.Update(fileMetadata, fileId, stream, fileData.MimeType);
                        request.Fields = "id,name,webViewLink,version";
                        request.Upload();
                    }

                    //Get file details
                    var file = request.ResponseBody;

                    //Set result
                    result.Id = file.Id;
                    result.ViewLink = file.WebViewLink;
                    result.Version = file.Version;
                }
                else
                {
                    //Upload file
                    FilesResource.CreateMediaUpload request;
                    using (var stream = new MemoryStream(fileBytes))
                    {
                        request = _service.Files.Create(fileMetadata, stream, fileData.MimeType);
                        request.Fields = "id,name,webViewLink,version";
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
                    result.ViewLink = file.WebViewLink;
                    result.Version = file.Version;
                }
            }
            catch (Exception ex)
            {
                LogInternalError(ex);
                throw ex;
            }

            return result;
        }

        [HttpPost]
        [ODataRoute("RemoveFile")]
        [EnableCors("CORSPolicy")]
        [Authorize(Roles = "Contributor,Custodian,Configurator,SysAdmin")]
        public bool RemoveFile([FromBody] UploadFile fileData)
        {
            //Authenticate
            string keyFilePath = _config.GetSection("GAPI")["KeyFileName"];
            string serviceAccountEmail = _config.GetSection("GAPI")["ServiceAccountEmail"];
            _service = AuthenticateServiceAccount(serviceAccountEmail, keyFilePath);

            var result = false;

            try
            {
                //Get the file-Id
                var fileId = SearchByName(fileData.FileName);

                //Remove the file
                if (fileId != "")
                {
                    _service.Files.Delete(fileId).Execute();
                }

                result = true;
            }
            catch (Exception ex)
            {
                LogInternalError(ex);
                throw ex;
            }

            return result;
        }

        [HttpGet]
        [ODataRoute("RemoveAllFiles")]
        [EnableCors("CORSPolicy")]
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
                LogInternalError(ex);
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
                LogInternalError(ex);
                throw ex;
            }

            return result;
        }

        private void LogInternalError(Exception ex)
        {
            if (!Directory.Exists("logs"))
            {
                Directory.CreateDirectory("logs");
            }

            string uid = Guid.NewGuid().ToString();
            System.IO.File.WriteAllText($"logs\\internalError_{uid}.txt", ex.ToString());
        }
    }
}