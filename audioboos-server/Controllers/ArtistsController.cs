using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AudioBoos.Server.Models;
using Microsoft.AspNetCore.Mvc;
using AudioBoos.Server.Helpers;
using AudioBoos.Server.Models.DTO;
using AudioBoos.Server.Models.Settings;
using AudioBoos.Server.Persistence;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace AudioBoos.Server.Controllers {
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class ArtistsController : ControllerBase {
        private readonly AudioBoosContext _context;
        private readonly SystemSettings _systemSettings;

        public ArtistsController(IOptions<SystemSettings> systemSettings, AudioBoosContext context) {
            _systemSettings = systemSettings.Value;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ArtistDTO>>> Get() {
            var artists = await _context.Artists.OrderBy(r => r.ArtistName).ToListAsync();

            return artists
                .Select((d) => new ArtistDTO {
                    Id = d.Id,
                    ArtistName = d.ArtistName,
                    LargeImage = d.LargeImage,
                    SmallImage = d.SmallImage
                })
                .ToList();
        }
    }
}
