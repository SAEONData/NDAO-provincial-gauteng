using Microsoft.EntityFrameworkCore.Migrations;

namespace CCIS_API.Migrations
{
    public partial class UpdatedGoal5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BudgetDuration",
                table: "Goal5",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FundingAgency",
                table: "Goal5",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PartneringDepartments",
                table: "Goal5",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalBudget",
                table: "Goal5",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BudgetDuration",
                table: "Goal5");

            migrationBuilder.DropColumn(
                name: "FundingAgency",
                table: "Goal5");

            migrationBuilder.DropColumn(
                name: "PartneringDepartments",
                table: "Goal5");

            migrationBuilder.DropColumn(
                name: "TotalBudget",
                table: "Goal5");
        }
    }
}
