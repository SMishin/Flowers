using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Flowers.BL.Products;
using Flowers.BL.Products.ProductType;

namespace Flowers.Web.Controllers
{
	public class HomeController : Controller
	{
		private readonly IProductReadOnlyStore _productReadOnlyStore;

		public HomeController(IProductReadOnlyStore productReadOnlyStore)
		{
			_productReadOnlyStore = productReadOnlyStore;
		}

		public async Task<ActionResult> Index()
		{
			var flowers = _productReadOnlyStore.GetWithMainImageAsync(ProductType.Flowers);
			var toys = _productReadOnlyStore.GetWithMainImageAsync(ProductType.Toys);

			await Task.WhenAll(flowers, toys);

			var data = new Dictionary<ProductType, Product[]>
			{
				{ProductType.Flowers, flowers.Result},
				{ProductType.Toys, toys.Result}
			};

			return View(data);
		}
	}
}
