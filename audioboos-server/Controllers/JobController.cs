using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AudioBoos.Server.Models.DTO;
using AudioBoos.Server.Services.Jobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AudioBoos.Server.Controllers {
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class JobController : ControllerBase {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<JobController> _logger;

        public JobController(IServiceProvider serviceProvider, ILogger<JobController> logger) {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        [HttpPost("start/{jobName}")]
        public async Task<ActionResult<JobStartDTO>> StartJob(string jobName, CancellationToken cancellationToken) {
            try {
                var jobs = _serviceProvider
                    .GetServices<IHostedService>();

                var job = jobs
                    .Cast<IAudioBoosJob>()
                    .FirstOrDefault(j => j.JobName.Equals(jobName));

                if (job is null) {
                    return NotFound();
                }

                await job.StartAsync(cancellationToken);
                return Ok();
            } catch (Exception e) {
                _logger.LogError(e.Message);
            }

            return StatusCode(500);
        }
    }
}
