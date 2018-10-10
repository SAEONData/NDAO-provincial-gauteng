using CCIS_API.Database.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Database.Contexts
{
    public class SQLDBContext : DbContext
    {
        public DbSet<Goal1> Goal1 { get; set; }
        public DbSet<Goal2> Goal2 { get; set; }
        public DbSet<Goal3> Goal3 { get; set; }
        public DbSet<Goal4> Goal4 { get; set; }
        public DbSet<Goal5> Goal5 { get; set; }
        public DbSet<Goal6> Goal6 { get; set; }
        public DbSet<Goal7> Goal7 { get; set; }
        public DbSet<Goal8> Goal8 { get; set; }
        public DbSet<Goal9> Goal9 { get; set; }
        public DbSet<StatusHistory> StatusHistory { get; set; }

        public SQLDBContext() : base() { }

        public SQLDBContext(DbContextOptions options) : base(options) { }
    }
}
