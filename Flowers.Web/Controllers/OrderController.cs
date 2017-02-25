using System.Web.Mvc;
using Flowers.BL.Products;

namespace Flowers.Web.Controllers
{
	[RoutePrefix("order")]
	public class OrderController : Controller
	{
		public OrderController(IProductReadOnlyStore productReadOnlyStore)
		{
		}

		[Route("cart")]
		public ActionResult Index()
		{
			return View();
		}
	}
}
