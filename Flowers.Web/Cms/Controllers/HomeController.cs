using System.Web.Mvc;

namespace Flowers.Web.Cms.Controllers
{
	//[Authorize]
	[RouteArea("Cms", AreaPrefix = "_cms")]
	public class HomeController : Controller
	{
		[Route("{url?}")]
		public ActionResult Index()
		{
			return View();
		}
	}
}
