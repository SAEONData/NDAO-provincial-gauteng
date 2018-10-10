using Microsoft.EntityFrameworkCore.Migrations;

namespace CCIS_API.Migrations
{
    public partial class AddedStatusfields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Goal9",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Goal8",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Goal7",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Goal6",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Goal5",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Goal4",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Goal3",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Goal2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Goal1",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
