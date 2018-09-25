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
        public SQLDBContext _context { get; }
        public IConfiguration _config { get; set; }

        public GoalsController(SQLDBContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
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
        public string UploadFile([FromBody] UploadFile fileData)
        {
            string keyFilePath = _config.GetSection("GAPI")["KeyFileName"];
            string serviceAccountEmail = _config.GetSection("GAPI")["ServiceAccountEmail"];
            DriveService service = AuthenticateServiceAccount(serviceAccountEmail, keyFilePath);

            var fileMetadata = new Google.Apis.Drive.v3.Data.File()
            {
                Name = fileData.Id,
                MimeType = fileData.MimeType
            };

            string fileDataBase64 = fileData.Base64Data.Replace($"data:{fileData.MimeType};base64,", "");
            byte[] fileBytes = Convert.FromBase64String(fileDataBase64);
            FilesResource.CreateMediaUpload request;
            using (var stream = new MemoryStream(fileBytes))
            {
                request = service.Files.Create(fileMetadata, stream, fileData.MimeType);
                request.Fields = "id,name,webContentLink,webViewLink,version";
                request.Upload();
            }

            var file = request.ResponseBody;

            return "working on it...";
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
            catch(Exception ex)
            {
                return null;
            }

            return null;
        }
    }

}