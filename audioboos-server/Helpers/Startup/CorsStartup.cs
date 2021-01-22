using AudioBoos.Server.Models.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AudioBoos.Server.Helpers.Startup {
    public static class CorsStartup {
        public static IServiceCollection AddAudioBoosCors(this IServiceCollection services, IConfiguration config) {
            services.AddCors(options => {
                options.AddPolicy(name: "AudioBoosCors",
                    builder => {
                        builder.AllowAnyMethod();
                        builder.AllowAnyHeader();

                        builder.WithOrigins(
                            "http://localhost:3000",
                            "http://localhost:3000/"
                        );
                    });
            });

            return services;
        }
    }
}
