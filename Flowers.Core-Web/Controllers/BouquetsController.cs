using System.Threading.Tasks;
using Flowers.CoreWeb.Models.Bouquets;
using Flowers.CoreWeb.Models.Products;
using Flowers.Products;
using Flowers.Products.Bouquets;
using Flowers.Products.ProductTypes;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Controllers
{
	[Route("bouquets")]
	public class BouquetsController : Controller
	{
		private readonly IProductsReadOnlyStore _productsReadOnlyStore;
		private readonly IBouquetsManager _bouquetsManager;

		public BouquetsController(IProductsReadOnlyStore productsReadOnlyStore, IBouquetsManager bouquetsManager)
		{
			_productsReadOnlyStore = productsReadOnlyStore;
			_bouquetsManager = bouquetsManager;
		}

		[Route("")]
		[HttpGet]
		public async Task<IActionResult> Index([ModelBinder(BinderType = typeof(FilterModelBinder<TypesFilter<BouquetType>>), Name = "bt")] TypesFilter<BouquetType> filter, int page = 1)
		{
			var bouquets = _bouquetsManager.GetPublishedWithMainImageAsync(filter, page);

			await bouquets;

			var data = new BouquetsIndexViewModel
			{
				Data = bouquets.Result,
			};

			return View(data);
		}

		[Route("{id:int}")]
		[HttpGet]
		public async Task<IActionResult> Details(int id)
		{
			var product = _productsReadOnlyStore.GetAsync(id);
			var images = _productsReadOnlyStore.GetImagesAsync(id);
			var otherProducts = _productsReadOnlyStore.GetPublishedWithMainImageAsync(ProductType.Bouquets, 0, 6);

			await Task.WhenAll(product, images, otherProducts);

			if (product.Result == null)
			{
				return NotFound();
			}
			var data = new ProdutcsDetailsViewModel
			{
				Product = product.Result,
				ProductImages = images.Result,
				OtherProducts = otherProducts.Result
			};

			return View(@"~/Views/Produtcs/Details.cshtml", data);
		}

	}
}