using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using NDAO_API.Database.Contexts;
using NDAO_API.Database.Models;
using NDAO_API.Extensions;
using NDAO_API.ViewModels;
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

namespace NDAO_API.Controllers
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

        /// <summary>
        /// Get a list of Goal
        /// </summary>
        /// <returns>List of Goal</returns>
        [HttpGet]
        [EnableQuery]
        public IQueryable<Goal> Get()
        {
            return _context.Goals.AsQueryable();
        }

        /// <summary>
        /// Add/Update a specific Goal
        /// </summary>
        /// <param name="goal">Goal to add/update</param>
        /// <returns>Success/Fail status</returns>
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

        /// <summary>
        /// Get a list of Goal in GeoJSON format
        /// </summary>
        /// <returns>List of Goal in GeoJSON format</returns>
        [HttpGet]
        [EnableQuery]
        public JsonResult GeoJson()
        {
            var vmsRegions = GetVMSData("regions/flat").Result;
            var vmsSectors = GetVMSData("sectors/flat").Result;

            var goalData = _context.Goals
                .Select(g => new
                {
                    type = "Feature",
                    geometry = new
                    {
                        type = GetWKTType(g.Questions.FirstOrDefault(q => q.Key == "Region"), vmsRegions),
                        coordinates = GetCoordinates(g.Questions.FirstOrDefault(q => q.Key == "Region"), vmsRegions)
                    },
                    properties = new
                    {
                        id = g.Id, //Goal Id
                        title = $"Goal-{g.Type}",
                        regions = GetGeoProps(ParseIntCustom(g.Questions.FirstOrDefault(q => q.Key == "Region").Value), vmsRegions), //Regions
                        sectors = GetGeoProps(ParseIntCustom(g.Questions.FirstOrDefault(q => q.Key == "Sector").Value), vmsSectors), //Sectors
                        institution = g.Questions.FirstOrDefault(q => q.Key == "Institution").Value, //Institution Name
                        type = g.Type, //Goal Type
                        year = DateTime.Parse(g.CreateDate).Year, //Goal Year (from CreateDate)
                        status = g.Status
                    }
                })
                //.Where(x => x.geometry.coordinates.Count() > 0 && (x.geometry.coordinates[0] as object[]).Count() > 0) //Exclude no coordinates
                .Where(x => x.geometry.coordinates.Count() > 0) //Exclude no coordinates
                .ToList();

            return new JsonResult(goalData);
        }

        /// <summary>
        /// Get a filtered list of Goal with additional data
        /// </summary>
        /// <param name="region">Region filter (optional)</param>
        /// <param name="sector">Sector filter (optional)</param>
        /// <param name="goal">Goal filter (optional)</param>
        /// <param name="year">Year filter (optional)</param>
        /// <param name="institution">Institution filter (optional)</param>
        /// <returns>Filtered list of Goal with additional data</returns>
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

        private string GetWKTType(Question Region, List<StandardVocabItem> vmsRegions)
        {
            string type = "Polygon";

            var vmsRegion = vmsRegions.FirstOrDefault(v => v.Id.ToString() == Region.Value);
            if (vmsRegion != null)
            {
                var simpleWKT = vmsRegion.AdditionalData.FirstOrDefault(ad => ad.Key == "SimpleWKT");
                if (!string.IsNullOrEmpty(simpleWKT.Value))
                {
                    type = WKTConvert.GetWKTType(simpleWKT.Value).ToString();
                }
            }

            return type;
        }

        private object[] GetCoordinates(Question Region, List<StandardVocabItem> vmsRegions)
        {
            var result = new List<object>();

            var vmsRegion = vmsRegions.FirstOrDefault(v => v.Id.ToString() == Region.Value);
            if (vmsRegion != null)
            {
                var simpleWKT = vmsRegion.AdditionalData.FirstOrDefault(ad => ad.Key == "SimpleWKT");
                if (!string.IsNullOrEmpty(simpleWKT.Value))
                {
                    //Extract polygon data
                    var WKTPolygons = WKTConvert.GetPolygons(simpleWKT.Value);
                    foreach (var poly in WKTPolygons)
                    {
                        var polygon = new List<object>();

                        //Convert points
                        foreach (var point in poly.WKTPoints)
                        {
                            var polyPoint = new double[] { point.Lat, point.Lng };
                            polygon.Add(polyPoint);
                        }

                        //Add result if relevant
                        if (polygon.Count > 0)
                        {
                            result.Add(polygon);
                        }
                    }
                }
            }

            return result.ToArray();
        }

        //private object[] GetCoordinates(Question Region, List<StandardVocabItem> vmsRegions)
        //{
        //    var polygon = new List<object>();

        //    var vmsRegion = vmsRegions.FirstOrDefault(v => v.Id.ToString() == Region.Value);
        //    if (vmsRegion != null)
        //    {
        //        var simpleWKT = vmsRegion.AdditionalData.FirstOrDefault(ad => ad.Key == "SimpleWKT");
        //        if (!string.IsNullOrEmpty(simpleWKT.Value))
        //        {
        //            var parsedWKT = simpleWKT.Value.Replace("POLYGON((", "").Replace("))", "");

        //            foreach (var point in parsedWKT.Split(","))
        //            {
        //                var pointValues = point.Trim().Split(" ");
        //                if (pointValues.Length == 2)
        //                {
        //                    if (double.TryParse(pointValues[0].Trim(), out double pointLat) &&
        //                        double.TryParse(pointValues[1].Trim(), out double pointLon))
        //                    {
        //                        var polyPoint = new double[] { pointLat, pointLon };
        //                        polygon.Add(polyPoint);
        //                    }
        //                }
        //            }
        //        }

        //    }

        //    return polygon.ToArray();
        //}

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

        private List<int> GetParents(int filterID, List<StandardVocabItem> data)
        {
            var parentId = "";

            //Get ParentId
            var vmsItem = data.FirstOrDefault(x => x.Id == filterID.ToString());
            if (vmsItem != null)
            {
                var addItem = vmsItem.AdditionalData.FirstOrDefault(x => x.Key == "ParentId");
                if (!string.IsNullOrEmpty(addItem.Value))
                {
                    parentId = addItem.Value;
                }
            }

            var parents = data
                .Where(x =>
                    x.Id == parentId
                )
                .Select(x => int.Parse(x.Id))
                .ToList();

            var addParents = new List<int>();
            foreach (var p in parents)
            {
                //Add to temp list so as to not modify 'parents' during iteration
                addParents.AddRange(GetParents(p, data));
            }
            //Transfer to actual list
            parents.AddRange(addParents);

            return parents;
        }

        private List<List<int>> GetGeoProps(int regionId, List<StandardVocabItem> vmsItems)
        {
            var geoItems = new List<List<int>>();

            var itemGroup = new List<int>();
            itemGroup.Add(regionId);
            itemGroup.AddRange(GetParents(regionId, vmsItems));

            geoItems.Add(itemGroup);

            return geoItems;
        }
    }

}