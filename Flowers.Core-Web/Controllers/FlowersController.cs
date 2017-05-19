using System.Threading.Tasks;
using Flowers.CoreWeb.Models.Flowers;
using Flowers.Products;
using Flowers.Products.Flowers;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Controllers
{
	[Route("flowers")]
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


		//[HttpGet]
		//public async Task<ActionResult> Index(int page = 1)
		//{
		//    var products = await _flowersManager.GetPublishedWithMainImageAsync(page);
		//    return View(products);
		//}

		[HttpGet]
		[Route("")]
		public async Task<IActionResult> Index([ModelBinder(BinderType = typeof(FlowersFilterModelBinder), Name = "ft")] FlowersTypesFilter filter, int page = 1)
		{
			var products = await _flowersManager.GetPublishedWithMainImageAsync(filter, page);
			return View(new FlowersIndexViewModel
			{
				Data = products,
				Filter = filter ?? new FlowersTypesFilter()
			});
		}


		[Route("{id:int}")]
		[HttpGet]
		public async Task<IActionResult> Details(int id)
		{
			var flower = _flowersReadOnlyStore.GetAsync(id);
			var images = _productsReadOnlyStore.GetImagesAsync(id);
			var otherProducts = _flowersReadOnlyStore.GetRandomPublishedWithMainImageAsync(5);

			await Task.WhenAll(flower, images, otherProducts);

			if (flower.Result == null)
			{
				return NotFound();
			}

			var data = new FlowersDetailsViewModel
			{
				Flower = flower.Result,
				ProductImages = images.Result,
				OtherProducts = otherProducts.Result
			};

			return View("Details", data);
		}
	}
}