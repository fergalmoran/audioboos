using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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
using Microsoft.CodeAnalysis.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace AudioBoos.Server.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ILogger<AuthController> _logger;
        private readonly JWT _jwt;
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailSender _emailSender;

        public AuthController(
            SignInManager<AppUser> signInManager,
            ILogger<AuthController> logger,
            IOptions<JWT> jwtOptions,
            UserManager<AppUser> userManager,
            IEmailSender emailSender) {
            _signInManager = signInManager;
            _logger = logger;
            _jwt = jwtOptions.Value;
            _userManager = userManager;
            _emailSender = emailSender;
        }

        private async Task<JwtSecurityToken> _getUserToken(AppUser user) {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles) {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Secret));

            var token = new JwtSecurityToken(
                issuer: _jwt.ValidIssuer,
                audience: _jwt.ValidAudience,
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );
            return token;
        }

        [HttpPost("register")]
        public async Task<IActionResult> OnRegisterAsync([FromBody] RegisterDTO request) {
            var returnUrl = "https://changeme/please";

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
                    values: new {area = "Identity", userId = user.Id, code = code, returnUrl = returnUrl},
                    protocol: Request.Scheme);

                if (_userManager.Options.SignIn.RequireConfirmedAccount) {
                    await _emailSender.SendEmailAsync(
                        request.Email,
                        "Confirm your email",
                        $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");
                    return RedirectToPage("RegisterConfirmation",
                        new {email = request.Email, returnUrl = returnUrl});
                }

                await _signInManager.SignInAsync(user, isPersistent: false);
                var token = await _getUserToken(user);
                return Ok(new {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }

            foreach (var error in result.Errors) {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return StatusCode(500);
        }

        [HttpPost("login")]
        public async Task<IActionResult> OnLoginAsync([FromBody] LoginDTO request) {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password)) {
                return Unauthorized();
            }

            var token = await _getUserToken(user);
            return Ok(new {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            });
        }

        [HttpPost("__login")]
        public async Task<IActionResult> __OnLoginAsync([FromBody] LoginDTO request) {
            var returnUrl = "http://changeme/please";

            if (!ModelState.IsValid) {
                return StatusCode(500);
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, set lockoutOnFailure: true
            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password,
                request.RememberMe,
                lockoutOnFailure: false);
            if (result.Succeeded) {
                _logger.LogInformation("User logged in");
                return Ok();
            }

            if (result.RequiresTwoFactor) {
                return RedirectToPage("/login2fa", new {ReturnUrl = returnUrl, RememberMe = request.RememberMe});
            }

            if (result.IsLockedOut) {
                _logger.LogWarning("User account locked out");
                return RedirectToPage("/lockedout");
            } else {
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                return Ok();
            }
        }
    }
}
