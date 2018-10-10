using Microsoft.EntityFrameworkCore.Migrations;

namespace CCIS_API.Migrations
{
    public partial class AddRegionIdfieldtoGoals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                table: "Goal9",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                table: "Goal8",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                table: "Goal7",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                table: "Goal6",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                table: "Goal5",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                table: "Goal4",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                table: "Goal3",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                table: "Goal2",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RegionId",
                table: "Goal1",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Goal9");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Goal8");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Goal7");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Goal6");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Goal5");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Goal4");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Goal3");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Goal2");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Goal1");
        }
    }
}
