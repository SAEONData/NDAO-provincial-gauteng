using Microsoft.EntityFrameworkCore.Migrations;

namespace CCIS_API.Migrations
{
    public partial class UpdatedGoals89 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NonClimateChange",
                table: "Goal9",
                newName: "Practices");

            migrationBuilder.RenameColumn(
                name: "Practices",
                table: "Goal8",
                newName: "NonClimateChange");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Practices",
                table: "Goal9",
                newName: "NonClimateChange");

            migrationBuilder.RenameColumn(
                name: "NonClimateChange",
                table: "Goal8",
                newName: "Practices");
        }
    }
}
