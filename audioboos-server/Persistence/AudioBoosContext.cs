using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using AudioBoos.Server.Models.Store;
using AudioBoos.Server.Persistence.Annotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

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
            _addUniqueConstraints(modelBuilder);
        }

        //TODO: These should be extension methods
        private void _addUniqueConstraints(ModelBuilder modelBuilder) {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes()) {
                #region Convert UniqueKeyAttribute on Entities to UniqueKey in DB

                var properties = entityType.GetProperties();
                var immutableProperties = properties as IMutableProperty[] ?? properties.ToArray();
                if ((!immutableProperties.Any())) {
                    continue;
                }

                foreach (var property in immutableProperties) {
                    var uniqueKeys = _getUniqueKeyAttributes(entityType, property);
                    if (uniqueKeys == null) {
                        continue;
                    }

                    foreach (var uniqueKey in uniqueKeys.Where(x => x.Order == 0)) {
                        // Single column Unique Key
                        if (String.IsNullOrWhiteSpace(uniqueKey.GroupId)) {
                            entityType.AddIndex(property).IsUnique = true;
                        }
                        // Multiple column Unique Key
                        else {
                            var mutableProperties = new List<IMutableProperty>();
                            immutableProperties.ToList().ForEach(x => {
                                var uks = _getUniqueKeyAttributes(entityType, x);
                                if (uks == null) {
                                    return;
                                }

                                mutableProperties
                                    .AddRange(from uk in uks where (uk != null) && (uk.GroupId == uniqueKey.GroupId)
                                        select x);
                            });
                            entityType.AddIndex(mutableProperties).IsUnique = true;
                        }
                    }
                }

                #endregion Convert UniqueKeyAttribute on Entities to UniqueKey in DB
            }
        }

        private static IEnumerable<UniqueKeyAttribute> _getUniqueKeyAttributes(IMutableEntityType entityType,
            IMutableProperty property) {
            if (entityType == null) {
                throw new ArgumentNullException(nameof(entityType));
            } else if (entityType.ClrType == null) {
                throw new ArgumentNullException(nameof(entityType.ClrType));
            } else if (property == null) {
                throw new ArgumentNullException(nameof(property));
            } else if (property.Name == null) {
                throw new ArgumentNullException(nameof(property.Name));
            }

            var propInfo = entityType.ClrType.GetProperty(
                property.Name,
                BindingFlags.NonPublic |
                BindingFlags.Public |
                BindingFlags.Static |
                BindingFlags.Instance |
                BindingFlags.DeclaredOnly);
            return propInfo == null ? null : propInfo.GetCustomAttributes<UniqueKeyAttribute>();
        }
    }
}
