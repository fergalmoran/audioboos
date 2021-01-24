using System;
using AudioBoos.Server.Models.Store;
using AudioBoos.Server.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AudioBoos.Server.Helpers.Startup {
    public static class IdentityStartup {
        public static IServiceCollection AddAudioBoosIdentity(this IServiceCollection services, IConfiguration config) {
            services.AddDefaultIdentity<AppUser>(
                    options => {
                        options.SignIn.RequireConfirmedAccount = false;
                        options.Password.RequireDigit = false;
                        options.Password.RequireUppercase = false;
                        options.Password.RequireNonAlphanumeric = false;
                        options.Password.RequiredLength = 4;
                    })
                .AddEntityFrameworkStores<AudioBoosContext>();

            services.ConfigureApplicationCookie(options => {
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.Cookie.Name = $"AudioBoos.Auth";
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
                options.LoginPath = "/auth/login";
                options.ReturnUrlParameter = "/";
                options.SlidingExpiration = true;

                options.Cookie.SecurePolicy = CookieSecurePolicy.None;
                options.Cookie.SameSite = SameSiteMode.Lax;
            });

            return services;
        }

        public static IApplicationBuilder UseAudioBoosIdentity(this IApplicationBuilder app) {
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCookiePolicy(new CookiePolicyOptions {
                MinimumSameSitePolicy = SameSiteMode.Lax,
                Secure = CookieSecurePolicy.None,
            });
            return app;
        }
    }
}
