using Microsoft.EntityFrameworkCore.Migrations;

namespace CCIS_API.Migrations
{
    public partial class DroppedStatusfieldfromGoal19 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Goal9");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Goal8");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Goal7");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Goal6");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Goal5");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Goal4");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Goal3");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Goal2");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Goal1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Goal9",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Goal8",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Goal7",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Goal6",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Goal5",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Goal4",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Goal3",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Goal2",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Goal1",
                nullable: false,
                defaultValue: 0);
        }
    }
}
