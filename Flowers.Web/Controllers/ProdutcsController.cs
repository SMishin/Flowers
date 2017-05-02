using System.Threading.Tasks;
using System.Web.Mvc;
using Flowers.Products;
using Flowers.Products.ProductType;
using Flowers.Web.Models.Products;

namespace Flowers.Web.Controllers
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
		public async Task<ActionResult> Index(string type, int page = 1)
		{
			var productType = ProductTypeHelper.FromString(type);
			var products = _productsReadOnlyStore.GetPublishedWithMainImageAsync(productType, (page - 1) * _pageSize, page * _pageSize);
			var count = _productsReadOnlyStore.CountPublishedAsync(productType);

			await Task.WhenAll(products, count);

			var data = new ProdutcsIndexViewModel
			{
				Products = products.Result,
				Count = count.Result,
				Page = page,
				ProductType = productType
			};

			return View(data);
		}

		//[Route("{type}/{id:int}")]
		[HttpGet]
		public async Task<ActionResult> Details(string type, int id)
		{

			var product = _productsReadOnlyStore.GetAsync(id);
			var images = _productsReadOnlyStore.GetImagesAsync(id);
			var otherProducts = _productsReadOnlyStore.GetPublishedWithMainImageAsync(ProductTypeHelper.FromString(type), 0, 6);

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