using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CCIS_API.Database.Contexts;
using CCIS_API.Database.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CCIS_API.Controllers
{
    [Produces("application/json")]
    [ODataRoutePrefix("StatusHistory")]
    [EnableCors("CORSPolicy")]
    public class StatusHistoryController : ODataController
    {
        public SQLDBContext _context { get; }
        public StatusHistoryController(SQLDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
        public IQueryable<StatusHistory> Get()
        {
            return _context.StatusHistory.AsQueryable();
        }
    }
}