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
        public IQueryable<Institution> GetFilterInstitutions([FromBody] Filters filters)
        {
            var result = new List<Institution>();
            var goalIDs = new List<Guid>();

            if (filters.Region > 0)
            {
                //Get IDs for Goals in Region
                goalIDs.AddRange(_context.Goals
                    .Where(g => g.Questions.Any(q => q.Key == "Region" && q.Value == filters.Region.ToString()))
                    .Select(g => g.Id));                    
            }

            //if (filters.sector > 0)
            //{

            //}

            //if (filters.goal > 0)
            //{

            //}

            //if (filters.year > 0)
            //{

            //}

            //Remove duplicates
            goalIDs = goalIDs.Distinct().ToList();

            //Get and return Institution IDs
            var institutionIDs = _context.Questions
                .Where(q => goalIDs.Contains(q.Goal.Id) && q.Key == "Institution")
                .Select(q => int.Parse(q.Value))
                .Distinct();

            //Get institutions
            var institutions = GetInstitutions().Result;

            //Filter institutions
            result.AddRange(institutions.Where(i => institutionIDs.Contains(i.Id)));

            //Inject NGOs
            result.AddRange(_context.Questions
                .Where(q => goalIDs.Contains(q.Goal.Id) && q.Key == "InstitutionCustom" && (!string.IsNullOrEmpty(q.Value) && q.Value != "0"))
                .Select(q => new Institution() { Id = 0, Value = q.Value })
                .Distinct());

            //Return result
            return result.OrderBy(x => x.Value).AsQueryable();
        }

        private async Task<List<Institution>> GetInstitutions()
        {
            var result = new List<Institution>();

            HttpClient vmsClient = new HttpClient();
            vmsClient.BaseAddress = new Uri("http://app01.saeon.ac.za/VMS/api/");
            vmsClient.DefaultRequestHeaders.Accept.Clear();
            vmsClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await vmsClient.GetAsync("SAGovDepts/flat");
            if (response.IsSuccessStatusCode)
            {
                var responseObj = await response.Content.ReadAsAsync<StandardVocabOutput>();
                result.AddRange(responseObj.Items.Select(x => new Institution() { Id = int.Parse(x.Id), Value = x.Value }));
            }

            return result;
        }
    }
}