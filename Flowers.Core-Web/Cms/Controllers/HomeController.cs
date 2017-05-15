using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Cms.Controllers
{
	[Authorize]
	//[Area("Cms")]
	[Route("_cms")]
	public class HomeController : Controller
	{
		[Route("{*url}")]
		public ActionResult Index()
		{
			return View("~/Cms/Views/Home/Index.cshtml");
		}
	}
}
