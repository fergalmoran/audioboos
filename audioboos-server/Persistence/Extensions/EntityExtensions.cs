using AudioBoos.Server.Persistence.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AudioBoos.Server.Persistence.Extensions {
    public static class EntityExtensions {
        public static void Upsert<TEntity>(DbContext context, TEntity entity) where TEntity : IBaseEntity {
            context.Entry(entity).State = entity.Id == 0 ? EntityState.Added : EntityState.Modified;
            context.SaveChanges();
        }
    }
}
