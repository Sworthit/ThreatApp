using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ThreatApp.Models;

namespace ThreatApp.Database;

public class ThreatDbContext : IdentityDbContext<User>
{
    public DbSet<User> Users { get; set; }
    public DbSet<Threat> Threats { get; set; }

    public ThreatDbContext(DbContextOptions<ThreatDbContext> options): base(options) {}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
        optionsBuilder.UseSqlServer(configuration.GetConnectionString("ThreatDatabase"));
    }
}