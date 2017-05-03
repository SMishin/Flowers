using System.Threading.Tasks;
using System.Web.Http;
using Flowers.Colors;

namespace Flowers.Api.Colors
{
	[RoutePrefix("api")]
	public class ColorsController : ApiController
	{
		private readonly IColorsManager _colorsManager;
		private readonly IColorsReadOnlyStore _colorsReadOnlyStore;

		public ColorsController(IColorsManager colorsManager, IColorsReadOnlyStore colorsReadOnlyStore)
		{
			_colorsManager = colorsManager;
			_colorsReadOnlyStore = colorsReadOnlyStore;
		}

		[HttpGet]
		[Route("colors")]
		public async Task<IHttpActionResult> Get()
		{
			var data = await _colorsReadOnlyStore.GetAsync();
			return Ok(data);
		}

		[HttpGet]
		[Route("color/{id:int}")]
		public async Task<IHttpActionResult> Get(int id)
		{
			var data = await _colorsReadOnlyStore.GetAsync(id);
			return Ok(data);
		}

		[HttpPost]
		[Route("color")]
		[Authorize]
		public async Task<IHttpActionResult> Save(Color product)
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
		public async Task<IHttpActionResult> Remove(string id)
		{
			await _colorsManager.RemoveAsync(id);
			return Ok();
		}
	}
}
