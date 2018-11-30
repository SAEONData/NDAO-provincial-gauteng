using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
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
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

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

        [HttpGet]
        [EnableQuery]
        public JsonResult GeoJson()
        {
            var vmsRegions = GetVMSData("regions/flat").Result;

            var goalData = _context.Goals
                .Select(g => new
                {
                    type = "Feature",
                    geometry = new
                    {
                        type = "Polygon",
                        coordinates = GetCoordinates(g.Questions.FirstOrDefault(q => q.Key == "Region"), vmsRegions)
                    },
                    properties = new
                    {
                        id = g.Id, //Goal Id
                        region = ParseIntCustom(g.Questions.FirstOrDefault(q => q.Key == "Region").Value), //Region Id
                        sector = ParseIntCustom(g.Questions.FirstOrDefault(q => q.Key == "Sector").Value), //Sector Id
                        institution = g.Questions.FirstOrDefault(q => q.Key == "Institution").Value, //Institution Name
                        type = g.Type, //Goal Type
                        year = DateTime.Parse(g.CreateDate).Year //Goal Year (from CreateDate)
                    }
                })
                .ToList();

            return new JsonResult(goalData);
        }

        [HttpGet]
        [EnableQuery]
        [ODataRoute("GetGoalData(region={region},sector={sector},goal={goal},year={year},institution={institution})")]
        [EnableCors("CORSPolicy")]
        public IQueryable<Goal> GetGoalData([FromODataUri] int region, [FromODataUri] int sector, [FromODataUri] int goal,
            [FromODataUri] int year, [FromODataUri] string institution)
        {
            var goals = new List<Goal>();

            for (int goalType = 1; goalType <= 9; goalType++) //for each goal: 1-9
            {
                for (int goalYear = (year - 5); goalYear <= year; goalYear++) //for each year in range: (year-5) - year
                {
                    var adHocController = new AdHocController(_context);
                    var filteredGoals = adHocController.GetFilteredGoalsIDs(region, sector, goalType, goalYear, institution);

                    goals.AddRange(_context.Goals
                        .Include(g => g.Questions)
                        .Where(g => filteredGoals.Contains(g.Id))
                        .ToList());
                }
            }

            return goals
                .OrderBy(x => x.Type)
                .ThenBy(x => x.CreateDate)
                .AsQueryable();
        }

        private object[] GetCoordinates(Question Region, List<StandardVocabItem> vmsRegions)
        {
            var polygon = new List<object>();

            var vmsRegion = vmsRegions.FirstOrDefault(v => v.Id.ToString() == Region.Value);
            if (vmsRegion != null)
            {
                var simpleWKT = vmsRegion.AdditionalData.FirstOrDefault(ad => ad.Key == "SimpleWKT");
                if (!string.IsNullOrEmpty(simpleWKT.Value))
                {
                    var parsedWKT = simpleWKT.Value.Replace("POLYGON((", "").Replace("))", "");

                    foreach (var point in parsedWKT.Split(","))
                    {
                        var pointValues = point.Trim().Split(" ");
                        if (pointValues.Length == 2)
                        {
                            if (double.TryParse(pointValues[0].Trim(), out double pointLat) &&
                                double.TryParse(pointValues[1].Trim(), out double pointLon))
                            {
                                var polyPoint = new double[] { pointLat, pointLon };
                                polygon.Add(polyPoint);
                            }
                        }
                    }
                }

            }

            return polygon.ToArray();
        }

        private async Task<List<StandardVocabItem>> GetVMSData(string relativeURL)
        {
            var result = new StandardVocabOutput();

            //Setup http-client
            var client = new HttpClient();
            client.BaseAddress = new Uri(_config.GetValue<string>("VmsApiBaseUrl"));
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //Get data from VMS API
            var response = await client.GetAsync(relativeURL);
            if (response != null)
            {
                var jsonString = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<StandardVocabOutput>(jsonString);
            }

            return result.Items;
        }

        /// <summary>
        /// Converts string value to int, returns 0 for invalid strings
        /// </summary>
        private int ParseIntCustom(string s)
        {
            int.TryParse(s, out int res);
            return res;
        }
    }

}