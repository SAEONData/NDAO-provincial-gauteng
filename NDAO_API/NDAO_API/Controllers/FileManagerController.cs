using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using NDAO_API.Classes;
using NDAO_API.Database.Contexts;
using NDAO_API.Interfaces;
using NDAO_API.ViewModels;
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

namespace NDAO_API.Controllers
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

        /// <summary>
        /// Upload a file to the server
        /// </summary>
        /// <param name="fileData">Details of file to upload</param>
        /// <returns>FileDetails object</returns>
        [HttpPost]
        [ODataRoute("UploadFile")]
        [EnableCors("CORSPolicy")]
        [Authorize(Roles = "Contributor,Custodian,Configurator,SysAdmin")]
        public FileDetails UploadFile([FromBody] UploadFile fileData)
        {
            fileData.ApiBaseUrl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            return fileManager.UploadFile(fileData);
        }

        /// <summary>
        /// Remove a file from the server
        /// </summary>
        /// <param name="fileData">Details of file to upload</param>
        /// <returns>True (success) / False (fail)</returns>
        [HttpPost]
        [ODataRoute("RemoveFile")]
        [EnableCors("CORSPolicy")]
        [Authorize(Roles = "Contributor,Custodian,Configurator,SysAdmin")]
        public bool RemoveFile([FromBody] UploadFile fileData)
        {        
            return fileManager.RemoveFile(fileData);
        }

        /// <summary>
        /// Remove all files from server (this methos was created for testing purposes)
        /// </summary>
        //[HttpGet] //Removed to hide from SwaggerUI
        [ODataRoute("RemoveAllFiles")]
        [EnableCors("CORSPolicy")]
        public void RemoveAllFiles()
        {
            fileManager.RemoveAllFiles();
        }
    }
}