using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CCIS_API.Classes;
using CCIS_API.Database.Contexts;
using CCIS_API.Interfaces;
using CCIS_API.ViewModels;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Google.Apis.Services;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace CCIS_API.Controllers
{
    [Produces("application/json")]
    [EnableCors("CORSPolicy")]
    public class FileManagerController : ODataController
    {
        private IFileManager fileManager;

        public FileManagerController(SQLDBContext context, IConfiguration config)
        {
            var provider = config.GetValue<string>("FileManager");

            switch (provider)
            {
                case "google":
                    fileManager = new GoogleFileManager(config);
                    break;

                case "local":
                    fileManager = new LocalFileManager();
                    break;
            }
        }

        [HttpPost]
        [ODataRoute("UploadFile")]
        [EnableCors("CORSPolicy")]
        [Authorize(Roles = "Contributor,Custodian,Configurator,SysAdmin")]
        public FileDetails UploadFile([FromBody] UploadFile fileData)
        {
            fileData.ApiBaseUrl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            return fileManager.UploadFile(fileData);
        }

        [HttpPost]
        [ODataRoute("RemoveFile")]
        [EnableCors("CORSPolicy")]
        [Authorize(Roles = "Contributor,Custodian,Configurator,SysAdmin")]
        public bool RemoveFile([FromBody] UploadFile fileData)
        {        
            return fileManager.RemoveFile(fileData);
        }

        [HttpGet]
        [ODataRoute("RemoveAllFiles")]
        [EnableCors("CORSPolicy")]
        public void RemoveAllFiles()
        {
            fileManager.RemoveAllFiles();
        }
    }
}