using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using CCIS_API.Database.Contexts;
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

        [HttpPost]
        [ODataRoute("GetFilterInstitutions")]
        [EnableCors("CORSPolicy")]
        public IQueryable<string> GetFilterInstitutions([FromBody] Filters filters)
        {
            var result = new List<string>();
            var regionGoals = new List<Guid>();
            var sectorGoals = new List<Guid>();
            var typeGoals = new List<Guid>();
            var yearGoals = new List<Guid>();

            //Get IDs for Goals in Region
            regionGoals.AddRange(_context.Goals
                .Where(g => g.Questions.Any(q => q.Key == "Region" && q.Value == filters.Region.ToString()))
                .Select(g => g.Id));

            //Get IDs for Goals in Sector
            if (filters.Sector > 0) {
                sectorGoals.AddRange(_context.Goals
                    .Where(g => g.Questions.Any(q => q.Key == "Sector" && q.Value == filters.Sector.ToString()))
                    .Select(g => g.Id));
            }

            //Get IDs for Goals in Goal-Type
            if (filters.Goal > 0)
            {
                typeGoals.AddRange(_context.Goals
                    .Where(g => g.Type == filters.Goal)
                    .Select(g => g.Id));
            }

            //Get IDs for Goals in date range
            yearGoals.AddRange(_context.Goals
                .Where(g => 
                    (DateTime.Parse(g.CreateDate).Year >= (filters.Year - 5)) &&
                    (DateTime.Parse(g.CreateDate).Year <= filters.Year)
                )
                .Select(g => g.Id));

            //Inject NGOs
            result.AddRange(_context.Questions
                .Where(q =>
                    regionGoals.Contains(q.Goal.Id) &&
                    (filters.Sector == 0 || sectorGoals.Contains(q.Goal.Id)) &&
                    (filters.Goal == 0 || typeGoals.Contains(q.Goal.Id)) &&
                    (yearGoals.Contains(q.Goal.Id)) &&
                    (q.Key == "Institution" && !string.IsNullOrEmpty(q.Value))
                )
                .Select(q => q.Value)
                .Distinct()
                .OrderBy(x => x));

            //Return result
            return result.AsQueryable();
        }
    }
}