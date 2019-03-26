using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using NDAO_API.Database.Contexts;
using NDAO_API.Database.Models;
using NDAO_API.ViewModels;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace NDAO_API.Controllers
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

        /// <summary>
        /// Get a filtered list of Institution names
        /// </summary>
        /// <param name="region">Region filter (optional)</param>
        /// <param name="sector">Sector filter (optional)</param>
        /// <returns>Filtered list of Institution names</returns>
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

        /// <summary>
        /// Get filtered list of GoalId
        /// </summary>
        /// <param name="region">Region filter (optional)</param>
        /// <param name="sector">Sector filter (optional)</param>
        /// <param name="goal">Goal filter (optional)</param>
        /// <param name="year">Year filter (optional)</param>
        /// <param name="institution">Institution filter (optional)</param>
        /// <returns>Filtered list of GoalId</returns>
        [HttpGet]
        public List<Guid> GetFilteredGoalsIDs([FromODataUri] int region = 0, [FromODataUri] int sector = 0, [FromODataUri] int goal = 0, 
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
                        g.Questions.Any(q => q.Key == "Region" && q.Value.ToString() == region.ToString()) &&
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