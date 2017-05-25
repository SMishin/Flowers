using System.Threading.Tasks;
using Flowers.Products;
using Flowers.Products.Flowers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Api.Products
{
    [Microsoft.AspNetCore.Mvc.Route("api/products")]
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
        public async Task<IActionResult> Get()
        {
            var data = await _flowersStore.GetAsync();
            return Ok(data);
        }

        [HttpGet]
        [Route("flowers/published")]
        public async Task<IActionResult> GetPublishedWithMainImageAsync([ModelBinder(BinderType = typeof(FilterModelBinder<TypesFilter<FlowerType>>), Name = "ft")] TypesFilter<FlowerType> filter, int page = 1)
        {
            var data = await _flowersManager.GetPublishedWithMainImageAsync(filter, page);
            return Ok(data);
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("flower/{id:int}")]
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
