using Microsoft.EntityFrameworkCore.Migrations;

namespace CCIS_API.Migrations
{
    public partial class UpdatedGoal32 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MonitoringForcsting",
                table: "Goal3",
                newName: "MonitoringForcasting");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MonitoringForcasting",
                table: "Goal3",
                newName: "MonitoringForcsting");
        }
    }
}
