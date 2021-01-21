using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AudioBoos.Server.Helpers;
using AudioBoos.Server.Models.DTO;
using AudioBoos.Server.Models.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AudioBoos.Server.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class AlbumsController : ControllerBase {
        private readonly SystemSettings _systemSettings;

        public AlbumsController(IOptions<SystemSettings> systemSettings) {
            _systemSettings = systemSettings.Value;
        }

        [HttpGet("{artistName}")]
        public async Task<ActionResult<List<AlbumDTO>>> Get(string artistName) {
            var dir = Path.Combine(_systemSettings.AudioPath, artistName);
            if (!Directory.Exists(dir)) {
                return NotFound();
            }

            var dirList = await FileSystemHelpers.GetDirectoriesAsync(dir);
            return dirList
                .Select((d, i) => new AlbumDTO {
                    Id = i,
                    ArtistName = artistName,
                    AlbumName = d.GetBaseName(),
                    Description = Randomisers.LoremIpsum(10, 30),
                    LargeImage =$"https://localhost:5001/image/{Path.Combine(artistName, d.GetBaseName(), d.GetAlbumArt("Large").GetBaseName())}", 
                    SmallImage =$"https://localhost:5001/image/{Path.Combine(artistName, d.GetBaseName(), d.GetAlbumArt("Small").GetBaseName())}" 
                })
                .OrderBy(a => a.AlbumName)
                .ToList();
        }

        [HttpGet("{artistName}/{albumName}")]
        public async Task<ActionResult<AlbumDTO>> GetSingle(string artistName, string albumName) {
            var dir = Path.Combine(_systemSettings.AudioPath, artistName, albumName);
            if (!Directory.Exists(dir)) {
                return NotFound();
            }

            var fileList = (await FileSystemHelpers.GetFilesAsync(dir))
                .Where(f => f.IsAudioFile());

            var tracks = fileList
                .Select((f, i) => new Track {
                    Id = i,
                    TrackName = f.GetBaseName(),
                    AudioUrl = $"https://localhost:5001/audio/{Path.Combine(artistName, albumName, f.GetBaseName())}",
                })
                .OrderBy(a => a.Id)
                .ToArray();

            var results = new AlbumDTO {
                Id = 1,
                ArtistName = artistName,
                AlbumName = albumName,
                Description = Randomisers.LoremIpsum(10, 30),
                LargeImage =$"https://localhost:5001/image/{Path.Combine(artistName, albumName, dir.GetAlbumArt("Large").GetBaseName())}", 
                SmallImage =$"https://localhost:5001/image/{Path.Combine(artistName, albumName, dir.GetAlbumArt("Small").GetBaseName())}", 
                Tracks = tracks
            };
            return results;
        }
    }
}
