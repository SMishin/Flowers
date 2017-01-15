using System.Threading.Tasks;
using Flowers.BL.Products;
using System.Web.Mvc;
using Flowers.BL.Products.ProductType;

namespace Flowers.Web.Controllers
{
	public class ProdutcsController : Controller
	{
		private readonly IProductReadOnlyStore _productReadOnlyStore;

		public ProdutcsController(IProductReadOnlyStore productReadOnlyStore)
		{
			_productReadOnlyStore = productReadOnlyStore;
		}

		[Route("{type}")]
		public async Task<ActionResult> Index(string type)
		{
			var data = await _productReadOnlyStore.GetWithMainImageAsync(ProductTypeHelper.FromString(type));
			return View(data);
		}

		[Route("{type}/{id:int}")]
		public async Task<ActionResult> Index(int id)
		{
			var data = await _productReadOnlyStore.GetAsync(id);
			return View("Details", data);
		}
	}
}