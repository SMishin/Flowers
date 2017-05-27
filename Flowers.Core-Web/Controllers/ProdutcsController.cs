using System.Threading.Tasks;
using Flowers.CoreWeb.Models.Products;
using Flowers.Products;
using Flowers.Products.ProductTypes;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Controllers
{
	public class ProdutcsController : Controller
	{
		private readonly IProductsReadOnlyStore _productsReadOnlyStore;
		private readonly IProductsManager _productsManager;

		public ProdutcsController(IProductsReadOnlyStore productsReadOnlyStore, IProductsManager productsManager)
		{
			_productsReadOnlyStore = productsReadOnlyStore;
			_productsManager = productsManager;
		}

		//[Route("{type}")]
		[HttpGet]
		protected async Task<IActionResult> Index(ProductType type, int page = 1)
		{
			var products = _productsManager.GetPublishedWithMainImageAsync(type, page);

			await products;

			var data = new ProdutcsIndexViewModel
			{
				Data = products.Result,
				ProductType = type
			};

			return View(@"~/Views/Produtcs/Index.cshtml", data);
		}
		

		//[Route("{type}/{id:int}")]
		[HttpGet]
		protected async Task<IActionResult> Details(ProductType type, int id)
		{
			var product = _productsReadOnlyStore.GetAsync(id);
			var images = _productsReadOnlyStore.GetImagesAsync(id);
			var otherProducts = _productsReadOnlyStore.GetPublishedWithMainImageAsync(type, 0, 6);

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