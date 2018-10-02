using Microsoft.EntityFrameworkCore.Migrations;

namespace CCIS_API.Migrations
{
    public partial class UpdatedGoal9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NonClimateChange",
                table: "Goal8",
                newName: "Practices");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Practices",
                table: "Goal8",
                newName: "NonClimateChange");
        }
    }
}
