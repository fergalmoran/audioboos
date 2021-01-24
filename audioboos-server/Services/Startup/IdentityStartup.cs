﻿using System;
using System.Threading.Tasks;
using AudioBoos.Server.Models.Store;
using AudioBoos.Server.Persistence;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AudioBoos.Server.Services.Startup {
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
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<AudioBoosContext>();

            services.ConfigureApplicationCookie(options => {
                options.Cookie.Name = $"AudioBoos.Auth";
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.SameSite = SameSiteMode.Lax;
                options.Events.OnRedirectToLogin = context => {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
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
