using NDAO_API.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NDAO_API.Database.Contexts
{
    public class SQLDBContext : DbContext
    {
        public DbSet<Goal> Goals { get; set; }
        public DbSet<Question> Questions { get; set; }

        public SQLDBContext() : base() { }

        public SQLDBContext(DbContextOptions options) : base(options) { }
    }
}
