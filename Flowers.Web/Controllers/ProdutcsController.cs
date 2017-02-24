using System.Threading.Tasks;
using Flowers.BL.Products;
using System.Web.Mvc;
using Flowers.BL.Products.ProductType;
using Flowers.Web.Models.Products;

namespace Flowers.Web.Controllers
{
	[RoutePrefix("products")]
	public class ProdutcsController : Controller
	{
		private int _pageSize = 10;
		private readonly IProductReadOnlyStore _productReadOnlyStore;

		public ProdutcsController(IProductReadOnlyStore productReadOnlyStore)
		{
			_productReadOnlyStore = productReadOnlyStore;
		}

		[Route("{type}")]
		public async Task<ActionResult> Index(string type, int page = 1)
		{
			var productType = ProductTypeHelper.FromString(type);
			var products = _productReadOnlyStore.GetWithMainImageAsync(productType, (page - 1) * _pageSize, page * _pageSize);
			var count = _productReadOnlyStore.CountAsync(productType);

			await Task.WhenAll(products, count);

			var data = new ProdutcsIndexViewModel
			{
				Products = products.Result,
				Count = count.Result,
				Page = page
			};

			return View(data);
		}

		[Route("{type}/{id:int}")]
		public async Task<ActionResult> Details(string type, int id)
		{

			var product = _productReadOnlyStore.GetAsync(id);
			var images = _productReadOnlyStore.GetImagesAsync(id);
			var otherProducts = _productReadOnlyStore.GetWithMainImageAsync(ProductTypeHelper.FromString(type), 0, 6);

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