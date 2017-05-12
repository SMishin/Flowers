using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Flowers.CoreWeb.Controllers
{
	public class ErrorsController : Controller
	{
		private readonly ILogger<ErrorsController> _logger;

		public ErrorsController(ILogger<ErrorsController> logger)
		{
			_logger = logger;
		}

		[HttpGet("/errors/{statusCode?}")]
		public IActionResult Index(int? statusCode = null)
		{
			if (statusCode == null)
			{
				statusCode = 500;
			}

			//var reExecute = HttpContext.Features.Get<IStatusCodeReExecuteFeature>();

			//_logger.LogInformation($"Unexpected Status Code: {statusCode}, OriginalPath: {reExecute.OriginalPath}");


			return View(statusCode.ToString());
		}

	}
}
