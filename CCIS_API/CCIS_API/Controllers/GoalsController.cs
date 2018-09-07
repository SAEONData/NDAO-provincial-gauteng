using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CCIS_API.Database.Contexts;
using CCIS_API.Database.Models;
using CCIS_API.Extensions;
using CCIS_API.ViewModels;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CCIS_API.Controllers
{
    [Produces("application/json")]
    [ODataRoutePrefix("Goals")]
    [EnableCors("CORSPolicy")]
    public class GoalsController : ODataController
    {
        public SQLDBContext _context { get; }
        public GoalsController(SQLDBContext context)
        {
            _context = context;
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
    }
}