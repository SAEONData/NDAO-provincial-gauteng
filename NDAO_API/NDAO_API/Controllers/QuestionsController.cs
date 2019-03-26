using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NDAO_API.Database.Contexts;
using NDAO_API.Database.Models;
using NDAO_API.Extensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NDAO_API.Controllers
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

        /// <summary>
        /// Get a list of Question
        /// </summary>
        /// <returns>List of Question</returns>
        [HttpGet]
        [EnableQuery]
        public IQueryable<Question> Get()
        {
            return _context.Questions.AsQueryable();
        }

        /// <summary>
        /// Add/Update a specific Question
        /// </summary>
        /// <param name="question">Question to add/update</param>
        /// <returns>Success/Fail status</returns>
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