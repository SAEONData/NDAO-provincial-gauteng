using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using CCIS_API.Database.Contexts;
using CCIS_API.Database.Models;
using CCIS_API.Extensions;
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
    //[ODataRoutePrefix("Goals")]
    [EnableCors("CORSPolicy")]
    public class GoalsController : ODataController
    {
        private SQLDBContext _context { get; }
        private IConfiguration _config { get; set; }
        private DriveService _service { get; set; }

        public GoalsController(SQLDBContext context, IConfiguration config)
        {
            _context = context;
            _config = config;

            //Authenticate
            string keyFilePath = _config.GetSection("GAPI")["KeyFileName"];
            string serviceAccountEmail = _config.GetSection("GAPI")["ServiceAccountEmail"];
            _service = AuthenticateServiceAccount(serviceAccountEmail, keyFilePath);
        }

        [HttpGet]
        [EnableQuery]
        public Goals Get()
        {
            var goals = new Goals
            {
                Id = Guid.NewGuid(),
                Goal1 = _context.Goal1.ToArray(),
                Goal2 = _context.Goal2.ToArray(),
                Goal3 = _context.Goal3.ToArray(),
                Goal4 = _context.Goal4.ToArray(),
                Goal5 = _context.Goal5.ToArray(),
                Goal6 = _context.Goal6.ToArray(),
                Goal7 = _context.Goal7.ToArray(),
                Goal8 = _context.Goal8.ToArray(),
                Goal9 = _context.Goal9.ToArray()
            };

            return goals;
        }

        [HttpPost]
        [ODataRoute("UploadFile")]
        [EnableCors("CORSPolicy")]
        [Authorize(Roles = "Contributor,Custodian,Configurator,SysAdmin")]
        public GoogleFile UploadFile([FromBody] UploadFile fileData)
        {
            GoogleFile result = null;

            try
            {
                //Prep for upload
                string fileDataBase64 = fileData.Base64Data.Replace($"data:{fileData.MimeType};base64,", "");
                byte[] fileBytes = Convert.FromBase64String(fileDataBase64);
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
                    result = new GoogleFile
                    {
                        Id = file.Id,
                        ViewLink = file.WebViewLink,
                        Version = file.Version
                    };
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
                    result = new GoogleFile
                    {
                        Id = file.Id,
                        ViewLink = file.WebViewLink,
                        Version = file.Version
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred: " + ex.Message);
            }

            return result;
        }

        [HttpPost]
        [ODataRoute("RemoveFile")]
        [EnableCors("CORSPolicy")]
        [Authorize(Roles = "Contributor,Custodian,Configurator,SysAdmin")]
        public bool RemoveFile([FromBody] UploadFile fileData)
        {
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
                Console.WriteLine("An error occurred: " + ex.Message);
            }

            return result;
        }

        [HttpGet]
        [ODataRoute("RemoveAllFiles")]
        [EnableCors("CORSPolicy")]
        public void RemoveAllFiles()
        {
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
        private static DriveService AuthenticateServiceAccount(string serviceAccountEmail, string keyFilePath)
        {
            var keyFile = new System.IO.FileInfo(keyFilePath);
            if (!keyFile.Exists)
            {
                return null;
            }

            string[] scopes = { DriveService.Scope.Drive };
            var certificate = new X509Certificate2(keyFile.FullName, "notasecret", X509KeyStorageFlags.Exportable);
            try
            {
                ServiceAccountCredential credential = new ServiceAccountCredential(
                    new ServiceAccountCredential.Initializer(serviceAccountEmail)
                    {
                        Scopes = scopes
                    }.FromCertificate(certificate));

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
                return null;
            }

            return null;
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
                Console.WriteLine("An error occurred: " + ex.Message);
            }

            return result;
        }
    }

}