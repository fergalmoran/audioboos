using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AudioBoos.Server.Helpers;
using AudioBoos.Server.Models.Settings;
using AudioBoos.Server.Models.Store;
using AudioBoos.Server.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AudioBoos.Server.Services.Jobs {
    public interface IAudioBoosJob : IHostedService {
        public string JobName { get; }
    }

    public class UpdateLibraryJob : BackgroundService, IAudioBoosJob {
        private readonly SemaphoreSlim __scanLock = new(1, 1);

        private readonly ILogger<UpdateLibraryJob> _logger;
        private readonly SystemSettings _systemSettings;
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly JobOptions _jobOptions;

        public string JobName => "UpdateLibrary";

        public UpdateLibraryJob(ILogger<UpdateLibraryJob> logger,
            IOptions<SystemSettings> systemSettings,
            IOptions<JobOptions> jobOptions,
            IServiceScopeFactory serviceScopeFactory) {
            _logger = logger;
            _systemSettings = systemSettings.Value;
            _jobOptions = jobOptions.Value;
            _serviceScopeFactory = serviceScopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken) {
            await _scanLibrary(cancellationToken);
        }

        private async Task _scanLibrary(CancellationToken cancellationToken) {
            _logger.LogInformation("Starting library scan");
            //First guess at this is...

            //1. Find every folder that contains an audio file
            //2. Filter these to only include folders that have no child folders
            //              (this will filter out random mp3 files kicking about
            //3. Steal their underpants
            //4. ????
            //5. Profit!!!

            //first stab... looks good on white board, pretty sure it will suck!
            await __scanLock.WaitAsync(cancellationToken);
            try {
                //HUGELY naive implementation... 
                //get artists
                using var scope = _serviceScopeFactory.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<AudioBoosContext>();
                var dirList = await FileSystemHelpers.GetDirectoriesAsync(_systemSettings.AudioPath);
                foreach (var dir in dirList.Where(d => !string.IsNullOrEmpty(d))) {
                    _logger.LogDebug($"Scanning:  {dir}");
                    var artistName = dir.GetBaseName();
                    _logger.LogDebug($"\tArtist:  {artistName}");

                    //TODO: this can be much cleaner
                    var artist = await context.Artists.Where(a => a.ArtistName.Equals(artistName))
                        .FirstOrDefaultAsync(cancellationToken);
                    if (artist is not null) {
                        continue;
                    }

                    artist = new Artist {
                        ArtistName = artistName,
                        Description = "New Artist, update Description"
                    };
                    await context.Artists.AddAsync(artist, cancellationToken);

                    // //get albums
                    //TODO:
                    //
                    // foreach (var folder in dirList) {
                    //     var fileList = folder.GetAllAudioFiles();
                    // }
                }

                await context.SaveChangesAsync(cancellationToken);
            } finally {
                __scanLock.Release();
            }
        }
    }
}
