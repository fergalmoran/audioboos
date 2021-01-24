using AudioBoos.Server.Models.Settings;
using AudioBoos.Server.Services.Jobs;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AudioBoos.Server.Services.Startup {
    public static class JobsStartup {
        private static readonly string policyName = "AudioBoosCors";

        public static IServiceCollection AddAudioBoosJobs(this IServiceCollection services, IConfiguration config) {
            services.AddHostedService<UpdateLibraryJob>();
            return services;
        }

        public static IApplicationBuilder UseAudioBoosJobs(this IApplicationBuilder app) {
            return app;
        }
    }
}
