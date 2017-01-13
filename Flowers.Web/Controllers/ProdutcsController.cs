using System.Web.Mvc;

namespace Flowers.Web.Controllers
{
	public class ProdutcsController : Controller
	{
		// GET: Produtcs
		[Route("{type}")]
		public ActionResult Index(string type)
		{
			return View();
		}

		[Route("{type}/{id:int}")]
		public ActionResult Index(int id)
		{
			return View("Details");
		}
	}
}