using AudioBoos.Server.Models.DTO;
using AudioBoos.Server.Models.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AudioBoos.Server.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class SettingsController : ControllerBase {
        private readonly SystemSettings _systemSettings;

        public SettingsController(IOptions<SystemSettings> systemSettings) {
            _systemSettings = systemSettings.Value;
        }

        [HttpGet]
        public ActionResult<SettingsDTO> Get() {
            return new SettingsDTO(_systemSettings.Hostname);
        }
    }
}
