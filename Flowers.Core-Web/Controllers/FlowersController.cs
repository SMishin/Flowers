using System.Threading.Tasks;
using Flowers.Colors;
using Flowers.CoreWeb.Models.Flowers;
using Flowers.Products;
using Flowers.Products.Flowers;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Flowers.CoreWeb.Controllers
{
	[Route("flowers")]
	public class FlowersController : Controller
	{
		private readonly IFlowersReadOnlyStore _flowersReadOnlyStore;
		private readonly IProductsReadOnlyStore _productsReadOnlyStore;
		private readonly IFlowersManager _flowersManager;
		private readonly IColorsReadOnlyStore _colorsReadOnlyStore;

		public FlowersController(
			IFlowersReadOnlyStore flowersReadOnlyStore,
			IProductsReadOnlyStore productsReadOnlyStore,
			IFlowersManager flowersManager,
			IColorsReadOnlyStore colorsReadOnlyStore
			)
		{
			_flowersReadOnlyStore = flowersReadOnlyStore;
			_productsReadOnlyStore = productsReadOnlyStore;
			_flowersManager = flowersManager;
			_colorsReadOnlyStore = colorsReadOnlyStore;
		}

		[HttpGet]
		[Route("")]
		public async Task<IActionResult> Index(
			[ModelBinder(BinderType = typeof(FilterModelBinder<TypesFilter<FlowersTypes>>), Name = "ft")] TypesFilter<FlowersTypes> flowersTypeFilter,
			[ModelBinder(BinderType = typeof(FilterModelBinder<ColorFilter>), Name = "c")] ColorFilter colorsFilter,
			[ModelBinder(BinderType = typeof(FilterModelBinder<PriceFilter>), Name = "p")] PriceFilter priceFilter,
			int page = 1)
		{
			var flowers = _flowersManager.GetPublishedWithMainImageAsync(page, flowersTypeFilter, colorsFilter, priceFilter);
			var colors = _colorsReadOnlyStore.GetCodesAsync(Products.ProductTypes.ProductType.Flowers);

			await Task.WhenAll(flowers, colors);

			return View(new FlowersIndexViewModel
			{
				Data = flowers.Result,

				FlowersTypesFilter = flowersTypeFilter ?? new TypesFilter<FlowersTypes>(),
				ColorsFilterModel = new Models.ColorsFilterModel
				{
					Colors = colors.Result.Select(t => new Color { Id = t }).ToArray(),
					ColorFilter = colorsFilter
				},
				PriceFilter = priceFilter

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