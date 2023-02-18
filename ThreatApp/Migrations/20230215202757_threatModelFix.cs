using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThreatApp.Migrations
{
    public partial class threatModelFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Threats");

            migrationBuilder.AddColumn<string>(
                name: "Latitude",
                table: "Threats",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Longtitude",
                table: "Threats",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Threats");

            migrationBuilder.DropColumn(
                name: "Longtitude",
                table: "Threats");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Threats",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }
    }
}
