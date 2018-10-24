using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using CCIS_API.Database.Contexts;
using CCIS_API.Database.Models;
using CCIS_API.ViewModels;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CCIS_API.Controllers
{
    [Produces("application/json")]
    [EnableCors("CORSPolicy")]
    public class AdHocController : ODataController
    {
        private SQLDBContext _context { get; }

        public AdHocController(SQLDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [ODataRoute("GetFilteredInstitutions(region={region},sector={sector})")]
        [EnableCors("CORSPolicy")]
        public IQueryable<string> GetFilteredInstitutions([FromODataUri] int region, [FromODataUri] int sector)
        {
            var filteredGoals = GetFilteredGoalsIDs(region, sector, institution: "ignore");

            return _context.Questions
                .Where(q =>
                     filteredGoals.Contains(q.Goal.Id) &&
                    (q.Key == "Institution" && !string.IsNullOrEmpty(q.Value))
                )
                .Select(q => q.Value)
                .Distinct()
                .OrderBy(x => x);
        }

        [HttpGet]
        [ODataRoute("GetTrafficLightData(region={region},sector={sector},goal={goal},year={year},institution={institution})")]
        [EnableCors("CORSPolicy")]
        public IQueryable<GoalStatus> GetTrafficLightData([FromODataUri] int region, [FromODataUri] int sector, [FromODataUri] int goal, 
            [FromODataUri] int year, [FromODataUri] string institution)
        {
            var goals = new List<GoalStatus>();
            year += 1; //inculde 1 future year for effect

            for (int goalType = 1; goalType <= 9; goalType++) //for each goal: 1-9
            {
                for(int goalYear = (year-5); goalYear <= year; goalYear++) //for each year in range: (year-5) - year
                {
                    var filteredGoals = GetFilteredGoalsIDs(region, sector, goalType, goalYear, institution);

                    var tmpGoals = _context.Goals
                        .Where(g => filteredGoals.Contains(g.Id))
                        .Select(g => g)
                        .OrderByDescending(g => g.CreateDate);

                    if (tmpGoals.Count() > 0)
                    {
                        var item = tmpGoals.ToList()[0];
                        var keys = new string[] { "DocumentLink", "EvidenceLink" };

                        var linkItem = _context.Questions.FirstOrDefault(q => q.Goal.Id == item.Id && keys.Contains(q.Key));

                        goals.Add(new GoalStatus()
                        {
                            Id = item.Id,
                            Type = goalType,
                            Year = goalYear,
                            Status = item.Status,
                            Link = linkItem!= null ? linkItem.Value : ""
                        });
                    }
                    else
                    {
                        goals.Add(new GoalStatus()
                        {
                            Id = Guid.Empty,
                            Type = goalType,
                            Year = goalYear,
                            Status = "",
                            Link = ""
                        });
                    }
                }
            }

            return goals
                .OrderBy(x => x.Type)
                .ThenBy(x => x.Year)
                .AsQueryable();
        }

        private List<Guid> GetFilteredGoalsIDs([FromODataUri] int region = 0, [FromODataUri] int sector = 0, [FromODataUri] int goal = 0, 
            [FromODataUri] int year = 0, [FromODataUri] string institution = "")
        {
            var result = new List<Guid>();
            var regionGoals = new List<Guid>();
            var sectorGoals = new List<Guid>();
            var typeGoals = new List<Guid>();
            var yearGoals = new List<Guid>();
            var institutionGoals = new List<Guid>();

            if(!string.IsNullOrEmpty(institution) && institution != "ignore")
            {
                //Get IDs for Goals for Institution
                institutionGoals.AddRange(_context.Goals
                    .Where(g => g.Questions.Any(q => q.Key == "Institution" && q.Value == institution))
                    .Select(g => g.Id));
            }
            else
            {
                //Get IDs for Goals in Region
                regionGoals.AddRange(_context.Goals
                    .Where(g => 
                        g.Questions.Any(q => q.Key == "Region" && q.Value == region.ToString()) &&
                        !g.Questions.Any(q => q.Key == "Institution" && !string.IsNullOrEmpty(q.Value) && institution != "ignore")
                    )
                    .Select(g => g.Id));

                //Get IDs for Goals in Sector
                if (sector > 0)
                {
                    sectorGoals.AddRange(_context.Goals
                        .Where(g => 
                            g.Questions.Any(q => q.Key == "Sector" && q.Value == sector.ToString()) &&
                            !g.Questions.Any(q => q.Key == "Institution" && !string.IsNullOrEmpty(q.Value) && institution != "ignore")
                        )
                        .Select(g => g.Id));
                }
            }

            //Get IDs for Goals in Goal-Type
            if (goal > 0)
            {
                typeGoals.AddRange(_context.Goals
                    .Where(g => g.Type == goal)
                    .Select(g => g.Id));
            }

            //Get IDs for Goals by year
            if (year > 0)
            {
                yearGoals.AddRange(_context.Goals
                        .Where(g => DateTime.Parse(g.CreateDate).Year == year)
                        .Select(g => g.Id));
            }

            //Get goals that meet all filter requirements
            return _context.Goals
                .Where(g =>
                    (
                        (!string.IsNullOrEmpty(institution) && institution != "ignore" && institutionGoals.Contains(g.Id)) ||
                        (
                            (string.IsNullOrEmpty(institution) || institution == "ignore") && 
                            regionGoals.Contains(g.Id) && (sector == 0 || sectorGoals.Contains(g.Id))
                        )
                    ) &&
                    (goal == 0 || typeGoals.Contains(g.Id)) &&
                    (year == 0 || yearGoals.Contains(g.Id))
                )
                .Select(g => g.Id)
                .ToList();
        }
    }
}