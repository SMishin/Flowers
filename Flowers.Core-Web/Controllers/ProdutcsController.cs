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
			var count = _productsReadOnlyStore.CountPublishedAsync(type);

			await Task.WhenAll(products, count);

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