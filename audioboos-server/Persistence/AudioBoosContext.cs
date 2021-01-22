using System;
using System.Linq;
using AudioBoos.Server.Models.Store;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols;

namespace AudioBoos.Server.Persistence {
    public class AudioBoosContext : ApiAuthorizationDbContext<AppUser> {
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Album> Tracks { get; set; }


        public AudioBoosContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions) {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.HasDefaultSchema("app");
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppUser>(b => {
                b.ToTable("AppUsers");  
            });

            foreach (var entity in modelBuilder.Model.GetEntityTypes()
                .Where(p => p.Name.StartsWith("Microsoft.AspNetCore.Identity") ||
                            p.Name.StartsWith("IdentityServer4.EntityFramework.Entities"))
                .Select(p => modelBuilder.Entity(p.ClrType))) {
                if (entity.Metadata.ClrType.Name.Contains("AspNet")) {
                    Console.WriteLine("Here");
                }

                entity.ToTable(entity.Metadata.ClrType.Name.Replace("`1", ""), "auth");
            }
        }
    }
}
