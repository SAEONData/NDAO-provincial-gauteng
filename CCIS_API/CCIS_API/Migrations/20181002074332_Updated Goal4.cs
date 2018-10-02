using Microsoft.EntityFrameworkCore.Migrations;

namespace CCIS_API.Migrations
{
    public partial class UpdatedGoal4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BudgetDuration",
                table: "Goal4",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FundingAgency",
                table: "Goal4",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartneringDepartments",
                table: "Goal4",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalBudget",
                table: "Goal4",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BudgetDuration",
                table: "Goal4");

            migrationBuilder.DropColumn(
                name: "FundingAgency",
                table: "Goal4");

            migrationBuilder.DropColumn(
                name: "PartneringDepartments",
                table: "Goal4");

            migrationBuilder.DropColumn(
                name: "TotalBudget",
                table: "Goal4");
        }
    }
}
