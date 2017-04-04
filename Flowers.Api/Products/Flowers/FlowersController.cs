using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Flowers.Api.Products.Flowers;
using Flowers.Products.Flowers;

namespace Flowers.Api.Products
{
	[RoutePrefix("api/products")]
	public class FlowersController : ApiController
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
        public async Task<IHttpActionResult> Get()
        {
            var data = await _flowersStore.GetAsync();
            return Ok(data);
        }

        [HttpGet]
		[Route("flowers/published")]
		public async Task<IHttpActionResult> GetPublishedWithMainImageAsync([ModelBinder(typeof(FlowersFilterModelBinder))] FlowersFilter filter, int page = 1)
		{
			var data = await _flowersManager.GetPublishedWithMainImageAsync(page);
			return Ok(data);
		}

		[HttpGet]
		[Route("flower/{id:int}")]
		public async Task<IHttpActionResult> Get(int id)
		{
			var data = await _flowersStore.GetAsync(id);

			if (data == null)
			{
				return NotFound();
			}

			return Ok(data);
		}

		[HttpPost]
		[Route("flower")]
		//[Authorize]
		public async Task<IHttpActionResult> Save(Flower flower)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			return Ok(await _flowersManager.SaveAsync(flower));
		}

		[HttpDelete]
		[Route("flower")]
		//[Authorize]
		public async Task<IHttpActionResult> Remove(int id)
		{
			await _flowersManager.RemoveAsync(id);
			return Ok();
		}
	}
}
