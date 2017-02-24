using System.Web.Mvc;
using Flowers.BL.Products;

namespace Flowers.Web.Controllers
{
	
	public class CartController : Controller
	{
		public CartController(IProductReadOnlyStore productReadOnlyStore)
		{
		}

		[Route("cart")]
		public ActionResult Index()
		{
			return View();
		}
	}
}
