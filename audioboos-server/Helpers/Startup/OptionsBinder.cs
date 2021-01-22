using AudioBoos.Server.Migrations.Services.Email;
using AudioBoos.Server.Models.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AudioBoos.Server.Helpers.Startup {
    public static class OptionsBinder {
        public static IServiceCollection AddAudioBoosOptions(this IServiceCollection services, IConfiguration config) {
            services.AddOptions();
            services.Configure<SystemSettings>(config.GetSection("System"));
            services.Configure<EmailOptions>(config.GetSection("EmailApiOptions"));

            return services;
        }
    }
}
