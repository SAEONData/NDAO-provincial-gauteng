using CCIS_API.Database.Models;
using CCIS_API.ViewModels;
using Microsoft.AspNet.OData.Builder;
using Microsoft.OData.Edm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Contexts
{
    public class ODataModelBuilder
    {
        public IEdmModel GetEdmModel(IServiceProvider serviceProvider)
        {
            var builder = new ODataConventionModelBuilder(serviceProvider);

            builder.EntitySet<Goal>("Goals")
                .EntityType
                .Filter() // Allow for the $filter Command
                .Count() // Allow for the $count Command
                .Expand() // Allow for the $expand Command
                .OrderBy() // Allow for the $orderby Command
                .Page() // Allow for the $top and $skip Commands
                .Select();// Allow for the $select Command; 

            builder.EntitySet<Question>("Questions")
                .EntityType
                .Filter() // Allow for the $filter Command
                .Count() // Allow for the $count Command
                .Expand() // Allow for the $expand Command
                .OrderBy() // Allow for the $orderby Command
                .Page() // Allow for the $top and $skip Commands
                .Select();// Allow for the $select Command; 

            builder
                .Action("UploadFile")
                .Returns<GoogleFile>()
                .Parameter<UploadFile>("fileData");

            builder
                .Action("RemoveFile")
                .Returns<bool>()
                .Parameter<UploadFile>("fileData");

            builder
                .Action("RemoveAllFiles");

            builder
                .Action("GetFilterInstitutions")
                .ReturnsCollection<Institution>()
                .Parameter<Filters>("filters");


            return builder.GetEdmModel();
        }
    }
}
