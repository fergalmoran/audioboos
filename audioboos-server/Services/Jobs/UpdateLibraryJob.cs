using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using AudioBoos.Server.Helpers;
using AudioBoos.Server.Models.Settings;
using AudioBoos.Server.Persistence;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AudioBoos.Server.Services.Jobs {
    public class UpdateLibraryJob : IHostedService {
        private readonly ILogger<UpdateLibraryJob> _logger;
        private Timer _timer;
        private readonly SystemSettings _systemSettings;
        private readonly JobOptions _jobOptions;

        public UpdateLibraryJob(ILogger<UpdateLibraryJob> logger,
            IOptions<SystemSettings> systemSettings,
            IOptions<JobOptions> jobOptions) {
            _logger = logger;
            _systemSettings = systemSettings.Value;
            _jobOptions = jobOptions.Value;
        }

        public Task StartAsync(CancellationToken cancellationToken) {
            _timer = new Timer(async o => await _scanLibrary(o), null, TimeSpan.Zero,
                TimeSpan.FromMinutes(_jobOptions.LibraryScanInterval));

            return Task.CompletedTask;
        }

        private async Task _scanLibrary(object state) {
            _logger.LogInformation("Starting library scan");
            //First guess at this is...

            //1. Find every folder that contains an audio file
            //2. Filter these to only include folders that have no child folders
            //              (this will filter out random mp3 files kicking about
            //3. Steal their underpants
            //4. ????
            //5. Profit!!!


            //first stab... looks good on white board, pretty sure it will suck!
            var dirList = await FileSystemHelpers.GetDirectoriesAsync(_systemSettings.AudioPath);
            var folderList = new List<string>();

            foreach (var folder in dirList) {
                var fileList = folder.GetAllAudioFiles();
            }
        }

        public Task StopAsync(CancellationToken stoppingToken) {
            _logger.LogInformation("Timed Hosted Service is stopping");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose() {
            _timer?.Dispose();
        }
    }
}
