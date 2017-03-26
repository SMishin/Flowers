using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;
using Flowers.BL.Products.Flowers;
using Flowers.Products.Flowers;
using Flowers.Products.ProductType;

namespace Flowers.Web.Controllers
{
	public class HomeController : Controller
	{
		private readonly IFlowersReadOnlyStore _flowersReadOnlyStore;

		public HomeController(IFlowersReadOnlyStore flowersReadOnlyStore)
		{
			_flowersReadOnlyStore = flowersReadOnlyStore;
		}

		[HttpGet]
		public async Task<ActionResult> Index()
		{
			var flowers = _flowersReadOnlyStore.GetPublishedWithMainImageAsync(0, 12);
			//var toys = _productsReadOnlyStore.GetPublishedWithMainImageAsync(ProductType.Toys, 0, 12);

			await Task.WhenAll(flowers); //, toys);

			var data = new Dictionary<ProductType, Flower[]>
			{
				{ProductType.Flowers, flowers.Result},
				//{ProductType.Toys, toys.Result}
			};

			return View(data);
		}
	}
}
