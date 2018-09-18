using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CCIS_API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Goal1",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DocumentLink = table.Column<string>(nullable: true),
                    HasAssessment = table.Column<bool>(nullable: false),
                    LastUpdateDate = table.Column<long>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    MetadataLink = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goal1", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goal2",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DedicatedChampion = table.Column<bool>(nullable: false),
                    DocumentLink = table.Column<string>(nullable: true),
                    DedicatedFunding = table.Column<bool>(nullable: false),
                    TotalBudget = table.Column<decimal>(nullable: false),
                    FundingDuration = table.Column<string>(nullable: true),
                    PartneringDepartments = table.Column<string>(nullable: true),
                    IncludedInForums = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    MetadataLink = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goal2", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goal3",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DisseminationUtilisation = table.Column<int>(nullable: false),
                    MonitoringForcsting = table.Column<int>(nullable: false),
                    TotalBudget = table.Column<decimal>(nullable: false),
                    BudgetDuration = table.Column<string>(nullable: true),
                    FundingAgency = table.Column<string>(nullable: true),
                    PartneringDepartments = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    MetadataLink = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goal3", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goal4",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CapacityBuilding = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    MetadataLink = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goal4", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goal5",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TechnologyAwareness = table.Column<int>(nullable: false),
                    EvidenceLink = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    MetadataLink = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goal5", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goal6",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    IncludedInForums = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    MetadataLink = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goal6", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goal7",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ResultingChange = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    MetadataLink = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goal7", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goal8",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    NonClimateChange = table.Column<int>(nullable: false),
                    EvidenceLink = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    MetadataLink = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goal8", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goal9",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    NonClimateChange = table.Column<int>(nullable: false),
                    EvidenceLink = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    MetadataLink = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goal9", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Goal1");

            migrationBuilder.DropTable(
                name: "Goal2");

            migrationBuilder.DropTable(
                name: "Goal3");

            migrationBuilder.DropTable(
                name: "Goal4");

            migrationBuilder.DropTable(
                name: "Goal5");

            migrationBuilder.DropTable(
                name: "Goal6");

            migrationBuilder.DropTable(
                name: "Goal7");

            migrationBuilder.DropTable(
                name: "Goal8");

            migrationBuilder.DropTable(
                name: "Goal9");
        }
    }
}
