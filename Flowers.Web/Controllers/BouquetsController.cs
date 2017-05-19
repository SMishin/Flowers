using System.Threading.Tasks;
using System.Web.Mvc;
using Flowers.Products;
using Flowers.Products.ProductTypes;

namespace Flowers.Web.Controllers
{
	[RoutePrefix("bouquets")]
	public class BouquetsController : ProdutcsController
	{
		public BouquetsController(IProductsReadOnlyStore productsReadOnlyStore) : base(productsReadOnlyStore)
		{
		}

		[Route("")]
		[HttpGet]
		public Task<ActionResult> Index(int page = 1)
		{
			return base.Index(ProductType.Bouquets, page);
		}

	}
}