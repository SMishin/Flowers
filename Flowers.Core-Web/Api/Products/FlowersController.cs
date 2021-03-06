﻿using System.Threading.Tasks;
using Flowers.Colors;
using Flowers.Products;
using Flowers.Products.Flowers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Api.Products
{
	[Route("api/products")]
	public class FlowersController : Controller
	{
		private readonly IFlowersManager _flowersManager;
		private readonly IFlowersReadOnlyStore _flowersStore;

		public FlowersController(IFlowersManager flowersManager, IFlowersReadOnlyStore flowersStore)
		{
			_flowersManager = flowersManager;
			_flowersStore = flowersStore;
		}

		[HttpGet]
		[Route("flowers")]
		public async Task<IActionResult> Get([ModelBinder(BinderType = typeof(FilterModelBinder<ColorFilter>), Name = "c")] ColorFilter colorsFilter)
		{
			var data = await _flowersStore.GetAsync(colorsFilter);
			return Ok(data);
		}

		[HttpGet]
		[Route("flowers/published")]
		public async Task<IActionResult> GetPublishedWithMainImageAsync(
			[ModelBinder(BinderType = typeof(FilterModelBinder<TypesFilter<FlowerType>>), Name = "ft")] TypesFilter<FlowerType> flowerTypeFilter,
			[ModelBinder(BinderType = typeof(FilterModelBinder<ColorFilter>), Name = "c")] ColorFilter colorsFilter,
			[ModelBinder(BinderType = typeof(FilterModelBinder<PriceFilter>), Name = "p")] PriceFilter priceFilter,
			int page = 1)
		{
			var data = await _flowersManager.GetPublishedWithMainImageAsync(page, flowerTypeFilter, colorsFilter, priceFilter);
			return Ok(data);
		}

		[HttpGet]
		[Route("flower/{id:int}")]
		public async Task<IActionResult> Get(int id)
		{
			var data = await _flowersStore.GetAsync(id);

			if (data == null)
			{
				return NotFound();
			}

			return Ok(data);
		}

		[Microsoft.AspNetCore.Mvc.HttpPost]
		[Microsoft.AspNetCore.Mvc.Route("flower")]
		[Authorize]
		public async Task<IActionResult> Save([FromBody]Flower flower)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			return Ok(await _flowersManager.SaveAsync(flower));
		}

		[HttpDelete]
		[Route("flower")]
		[Authorize]
		public async Task<IActionResult> Remove(int id)
		{
			await _flowersManager.RemoveAsync(id);
			return Ok();
		}
	}
}
