using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AudioBoos.Server.Models;
using Microsoft.AspNetCore.Mvc;
using AudioBoos.Server.Helpers;
using AudioBoos.Server.Models.DTO;
using AudioBoos.Server.Models.Settings;
using Microsoft.Extensions.Options;

namespace AudioBoos.Server.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class ArtistsController : ControllerBase {
        private readonly SystemSettings _systemSettings;

        public ArtistsController(IOptions<SystemSettings> systemSettings) {
            _systemSettings = systemSettings.Value;
        }

        [HttpGet]
        public async Task<ActionResult<List<ArtistDTO>>> Get() {
            var dirList = await FileSystemHelpers.GetDirectoriesAsync(_systemSettings.AudioPath);
            return dirList
                .Select((d, i) => new ArtistDTO {
                    Id = i,
                    ArtistName = d.GetBaseName()
                })
                .OrderBy(a => a.ArtistName)
                .ToList();
        }
    }
}
