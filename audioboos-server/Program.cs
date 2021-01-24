using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AudioBoos.Server.Services.Startup.SSL;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AudioBoos.Server {
    public class Program {
        public static void Main(string[] args) {
            //old style but certs work? CreateHostBuilder(args).Run();
            CreateHostBuilder(args).Build().Run();
        }

        public static IWebHost OldStyleButCertsWorkCreateHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseKestrel(options => options.ConfigureEndpoints())
                .Build();

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => {
                    webBuilder
                        .UseStartup<Startup>()
                        .UseKestrel(options => options.ConfigureEndpoints());
                });
    }
}
