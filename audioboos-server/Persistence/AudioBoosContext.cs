using System;
using System.Linq;
using AudioBoos.Server.Models.Store;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AudioBoos.Server.Persistence {
    public class AudioBoosContext : IdentityDbContext<AppUser> {
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Album> Tracks { get; set; }

        public AudioBoosContext(
            DbContextOptions options) : base(options) {
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
