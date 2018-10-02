using Microsoft.EntityFrameworkCore.Migrations;

namespace CCIS_API.Migrations
{
    public partial class UpdatedGoal6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IncludedInForums",
                table: "Goal6",
                newName: "ProfilesAndAssessments");

            migrationBuilder.AddColumn<string>(
                name: "EvidenceLink",
                table: "Goal6",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EvidenceLink",
                table: "Goal6");

            migrationBuilder.RenameColumn(
                name: "ProfilesAndAssessments",
                table: "Goal6",
                newName: "IncludedInForums");
        }
    }
}
