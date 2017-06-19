using System.Threading.Tasks;
using Flowers.Products.Flowers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Api.Products
{
	[Route("api")]
	public class FlowersTypesController : Controller
	{
		private readonly IFlowersTypeManager _flowersTypeManager;
		private readonly IFlowersTypesReadOnlyStore _flowersTypesReadOnlyStore;
		
		public FlowersTypesController(IFlowersTypeManager flowersTypeManager, IFlowersTypesReadOnlyStore flowersTypesReadOnlyStore)
		{
			_flowersTypeManager = flowersTypeManager;
			_flowersTypesReadOnlyStore = flowersTypesReadOnlyStore;
		}

		[HttpGet]
		[Route("flowers-types")]
		[Authorize]
		public async Task<IActionResult> Get()
		{
			return Ok(await _flowersTypesReadOnlyStore.Get());
		}

		[HttpPost]
		[Route("flowers-type")]
		[Authorize]
		public async Task<IActionResult> Add([FromBody]FlowerType flowerType)
		{
			await _flowersTypeManager.SaveAsync(flowerType);
			return Ok();
		}

		[HttpDelete]
		[Route("flowers-type")]
		[Authorize]
		public async Task<IActionResult> Remove(int id)
		{
			await _flowersTypeManager.RemoveAsync(id);
			return Ok();
		}
	}
}
