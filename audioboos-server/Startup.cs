using System;
using AudioBoos.Server.Migrations.Services.Email;
using AudioBoos.Server.Persistence;
using AudioBoos.Server.Services.Startup;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace AudioBoos.Server {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            if (services == null) {
                throw new NullReferenceException("Startup.services cannot be null");
            }

            services.AddDbContext<AudioBoosContext>(options =>
                options.UseNpgsql(
                    Configuration.GetConnectionString("DefaultConnection")
                )
            );

            services.AddAudioBoosOptions(Configuration)
                .AddAudioBoosJobs(Configuration)
                .AddAudioBoosCors(Configuration)
                .AddAudioBoosIdentity(Configuration);

            services.AddTransient<IEmailSender, EmailSender>();

            services.AddControllers();
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "arse", Version = "v1"});
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();

                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AudioBoos Server v1"));
            } else {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }


            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAudioBoosCors()
                .UseAudioBoosIdentity();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });

            using var scope = app.ApplicationServices.CreateScope();
            using var context = scope.ServiceProvider.GetService<AudioBoosContext>();
            //     if (env.IsDevelopment()) {
            //         context?.Database.ExecuteSqlRaw("DROP SCHEMA IF EXISTS app CASCADE");
            //         context?.Database.ExecuteSqlRaw("DROP SCHEMA IF EXISTS auth CASCADE");
            //         context?.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS public.__EFMigrationsHistory");
            //     }
            //
            //     context?.Database.Migrate();
        }
    }
}
