using System.Threading.Tasks;
using Flowers.CoreWeb.Models.Products;
using Flowers.Products;
using Flowers.Products.ProductTypes;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Controllers
{
	public class ProdutcsController : Controller
	{
		private int _pageSize = 6;
		private readonly IProductsReadOnlyStore _productsReadOnlyStore;

		public ProdutcsController(IProductsReadOnlyStore productsReadOnlyStore)
		{
			_productsReadOnlyStore = productsReadOnlyStore;
		}

		//[Route("{type}")]
		[HttpGet]
		protected async Task<IActionResult> Index(ProductType type, int page = 1)
		{
			var products = _productsReadOnlyStore.GetPublishedWithMainImageAsync(type, (page - 1) * _pageSize, page * _pageSize);
			var count = _productsReadOnlyStore.CountPublishedAsync(type);

			await Task.WhenAll(products, count);

			var data = new ProdutcsIndexViewModel
			{
				Products = products.Result,
				Count = count.Result,
				Page = page,
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

			return View("Details", data);
		}
	}
}