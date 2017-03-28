using System.Threading.Tasks;
using System.Web.Mvc;
using Flowers.Products;
using Flowers.Products.Flowers;
using Flowers.Web.Models.Flowers;

namespace Flowers.Web.Controllers
{
	//[RoutePrefix("flowers")]
	public class FlowersController : Controller
	{
		private readonly IFlowersReadOnlyStore _flowersReadOnlyStore;
		private readonly IProductsReadOnlyStore _productsReadOnlyStore;
	    private readonly IFlowersManager _flowersManager;

	    public FlowersController(IFlowersReadOnlyStore flowersReadOnlyStore, IProductsReadOnlyStore productsReadOnlyStore, IFlowersManager flowersManager)
		{
			_flowersReadOnlyStore = flowersReadOnlyStore;
			_productsReadOnlyStore = productsReadOnlyStore;
		    _flowersManager = flowersManager;
		}


		[HttpGet]
		public async Task<ActionResult> Index(int page = 1)
		{
		    var products = await _flowersManager.GetPublishedWithMainImageAsync(page);

		    if (products.Items.Length == 0)
		    {
		        return HttpNotFound();
		    }

		    return View(products);
		}


		//[Route("{id:int}")]
		[HttpGet]
		public async Task<ActionResult> Details(int id)
		{
			var product = _flowersReadOnlyStore.GetAsync(id);
			var images = _productsReadOnlyStore.GetImagesAsync(id);
			var otherProducts = _flowersReadOnlyStore.GetRandomPublishedWithMainImageAsync(5);

			await Task.WhenAll(product, images, otherProducts);

			if (product.Result == null)
			{
				return HttpNotFound();
			}

			var data = new FlowersDetailsViewModel
			{
				Product = product.Result,
				ProductImages = images.Result,
				OtherProducts = otherProducts.Result
			};

			return View("Details", data);
		}
	}
}