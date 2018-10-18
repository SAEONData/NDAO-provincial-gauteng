using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
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
    [ODataRoutePrefix("Goals")]
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
        }

        [HttpGet]
        [EnableQuery]
        public IQueryable<Goal> Get()
        {
            return _context.Goals.AsQueryable();
        }

        //Add/Update
        [HttpPost]
        [Authorize(Roles = "Contributor,Custodian,Configurator,SysAdmin")]
        [EnableQuery]
        public async Task<IActionResult> Post([FromBody]Goal goal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exiting = _context.Goals.FirstOrDefault(x => x.Id == goal.Id);
            if (exiting == null)
            {
                if (!HelperExtensions.CheckGoalCreateValues(goal))
                {
                    return BadRequest(new MissingFieldException("CreateUserId value required"));
                }

                //ADD GOAL
                HelperExtensions.ClearNullableInts(goal);
                _context.Goals.Add(goal);
                await _context.SaveChangesAsync();

                return Created(goal);
            }
            else
            {
                if (!HelperExtensions.CheckGoalUpdateValues(goal))
                {
                    return BadRequest(new MissingFieldException("LastUpdateUserId value required"));
                }

                //UPDATE
                goal.CreateDate = exiting.CreateDate;
                goal.CreateUser = exiting.CreateUser;
                _context.Entry(exiting).CurrentValues.SetValues(goal);
                await _context.SaveChangesAsync();

                //ADD/UPDATE QUESTIONS
                var qc = new QuestionsController(_context);
                foreach (var question in goal.Questions)
                {
                    question.Goal = exiting;
                    await qc.Post(question);
                }

                return Updated(exiting);
            }
        }
    }

}