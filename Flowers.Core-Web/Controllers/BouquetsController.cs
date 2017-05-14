using System.Threading.Tasks;
using Flowers.Products;
using Flowers.Products.ProductTypes;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Controllers
{
	[Route("bouquets")]
	public class BouquetsController : ProdutcsController
	{
		public BouquetsController(IProductsReadOnlyStore productsReadOnlyStore) : base(productsReadOnlyStore)
		{
		}

		[Route("")]
		[HttpGet]
		public Task<IActionResult> Index(int page = 1)
		{
			return base.Index(ProductType.Bouquets, page);
		}

		[Route("{id:int}")]
		[HttpGet]
		public Task<IActionResult> Details(int id)
		{
			return base.Details(ProductType.Bouquets, id);
		}

	}
}