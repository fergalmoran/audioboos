using AudioBoos.Server.Models.Store;
using Microsoft.EntityFrameworkCore;

namespace AudioBoos.Server.Persistence {
    public class AudioBoosContext : DbContext {
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Album> Tracks { get; set; }

        public AudioBoosContext() {
            
        }
        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //     => optionsBuilder.UseNpgsql("Host=my_host;Database=my_db;Username=my_user;Password=my_pw");
    }
}
