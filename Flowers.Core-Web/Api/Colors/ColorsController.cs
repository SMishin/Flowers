using System.Threading.Tasks;
using Flowers.Colors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Api.Colors
{
	[Route("api")]
	public class ColorsController : Controller
	{
		private readonly IColorsManager _colorsManager;
		private readonly IColorsReadOnlyStore _colorsReadOnlyStore;

		public ColorsController(IColorsManager colorsManager, IColorsReadOnlyStore colorsReadOnlyStore)
		{
			_colorsManager = colorsManager;
			_colorsReadOnlyStore = colorsReadOnlyStore;
		}

		[HttpGet("/colors")]
		public async Task<IActionResult> Get()
		{
			var data = await _colorsReadOnlyStore.GetAsync();
			return Ok(data);
		}

		[HttpGet("color/{id:int}")]
		public async Task<ActionResult> Get(int id)
		{
			var data = await _colorsReadOnlyStore.GetAsync(id);
			return Ok(data);
		}

		[HttpPost]
		[Route("color")]
		[Authorize]
		public async Task<IActionResult> Save(Color product)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			await _colorsManager.SaveAsync(product);

			return Ok();
		}

		[HttpDelete]
		[Route("color")]
		[Authorize]
		public async Task<IActionResult> Remove(string id)
		{
			await _colorsManager.RemoveAsync(id);
			return Ok();
		}
	}
}
