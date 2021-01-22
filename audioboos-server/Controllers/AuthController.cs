using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using AudioBoos.Server.Models.DTO;
using AudioBoos.Server.Models.Settings;
using AudioBoos.Server.Models.Store;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AudioBoos.Server.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ILogger<AuthController> _logger;
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailSender _emailSender;

        public AuthController(
            SignInManager<AppUser> signInManager,
            ILogger<AuthController> logger,
            UserManager<AppUser> userManager,
            IEmailSender emailSender) {
            _signInManager = signInManager;
            _logger = logger;
            _userManager = userManager;
            _emailSender = emailSender;
        }

        public async Task<IActionResult> OnPostAsync([FromBody] RegisterDTO request) {
            var externalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            var returnUrl = "https://changeme/please";

            if (ModelState.IsValid) {
                var user = new AppUser {UserName = request.Email, Email = request.Email};
                var result = await _userManager.CreateAsync(user, request.Password);
                if (result.Succeeded) {
                    _logger.LogInformation("User created a new account with password");

                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                    var callbackUrl = Url.Page(
                        "/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new {area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl},
                        protocol: Request.Scheme);

                    await _emailSender.SendEmailAsync(request.Email, "Confirm your email",
                        $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                    if (_userManager.Options.SignIn.RequireConfirmedAccount) {
                        return RedirectToPage("RegisterConfirmation",
                            new {email = request.Email, returnUrl = returnUrl});
                    } else {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return Ok();
                    }
                }

                foreach (var error in result.Errors) {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            return StatusCode(500);
        }

        [HttpPost("login")]
        public async Task<IActionResult> OnPostAsync([FromBody] LoginDTO request) {
            var externalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync())
                .ToList();

            if (!ModelState.IsValid) {
                return StatusCode(500);
            }

            var user = new AppUser {UserName = request.Email, Email = request.Email};
            var result = await _userManager.CreateAsync(user, request.Password);
            if (result.Succeeded) {
                _logger.LogInformation("User created a new account with password");

                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                var callbackUrl = Url.Page(
                    "/Account/ConfirmEmail",
                    pageHandler: null,
                    values: new {area = "Identity", userId = user.Id, code = code},
                    protocol: Request.Scheme);

                await _emailSender.SendEmailAsync(
                    request.Email,
                    "Confirm your email",
                    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                if (_userManager.Options.SignIn.RequireConfirmedAccount) {
                    return RedirectToPage("RegisterConfirmation",
                        new {email = request.Email});
                }

                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok();
            }

            foreach (var error in result.Errors) {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return StatusCode(500);
        }
    }
}
