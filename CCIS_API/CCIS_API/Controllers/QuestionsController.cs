using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CCIS_API.Database.Contexts;
using CCIS_API.Database.Models;
using CCIS_API.Extensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CCIS_API.Controllers
{
    [Produces("application/json")]
    [ODataRoutePrefix("Questions")]
    [EnableCors("CORSPolicy")]
    public class QuestionsController : ODataController
    {
        private SQLDBContext _context { get; }

        public QuestionsController(SQLDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableQuery]
        public IQueryable<Question> Get()
        {
            return _context.Questions.AsQueryable();
        }

        //Add/Update
        [HttpPost]
        [Authorize(Roles = "Contributor,Custodian,Configurator,SysAdmin")]
        [EnableQuery]
        public async Task<IActionResult> Post([FromBody]Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exiting = _context.Questions.FirstOrDefault(x => x.Id == question.Id || (x.Key == question.Key && x.Goal.Id == question.Goal.Id));
            if (exiting == null)
            {
                //ADD
                HelperExtensions.ClearIdentityValue(question);
                HelperExtensions.ClearNullableInts(question);
                _context.Questions.Add(question);
                await _context.SaveChangesAsync();

                return Created(question);
            }
            else
            {
                //UPDATE
                //_context.Entry(exiting).CurrentValues.SetValues(question);
                if (exiting.Value != question.Value)
                {
                    exiting.Value = question.Value;
                    await _context.SaveChangesAsync();
                }

                return Updated(exiting);
            }
        }
    }
}