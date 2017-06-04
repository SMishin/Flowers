using System.Threading.Tasks;
using Flowers.Colors;
using Flowers.Products;
using Flowers.Products.Bouquets;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Api.Products
{
    [Route("api/products")]
    public class BouquetsController : Controller
    {
        private readonly IBouquetsManager _bouquetsManager;
        private readonly IBouquetsReadOnlyStore _bouquetsStore;

        public BouquetsController(IBouquetsManager bouquetsManager, IBouquetsReadOnlyStore bouquetsStore)
        {
            _bouquetsManager = bouquetsManager;
            _bouquetsStore = bouquetsStore;
        }

        [HttpGet]
        [Route("bouquets")]
        public async Task<IActionResult> Get([ModelBinder(BinderType = typeof(FilterModelBinder<ColorFilter>), Name = "c")] ColorFilter colorsFilter)
        {
            var data = await _bouquetsStore.GetAsync(colorsFilter);
            return Ok(data);
        }

        [HttpGet]
        [Route("bouquets/published")]
        public async Task<IActionResult> GetPublishedWithMainImageAsync(
			[ModelBinder(BinderType = typeof(FilterModelBinder<TypesFilter<BouquetType>>), Name = "bt")] TypesFilter<BouquetType> bouquetsTypesFilter,
			[ModelBinder(BinderType = typeof(FilterModelBinder<ColorFilter>), Name = "c")] ColorFilter colorsFilter,
			int page = 1)
        {
            var data = await _bouquetsManager.GetPublishedWithMainImageAsync(page,bouquetsTypesFilter, colorsFilter);
            return Ok(data);
        }

        [HttpGet]
        [Route("bouquet/{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await _bouquetsStore.GetAsync(id);

            if (data == null)
            {
                return NotFound();
            }

            return Ok(data);
        }

        [HttpPost]
        [Route("bouquet")]
        [Authorize]
        public async Task<IActionResult> Save([FromBody]Bouquet bouquet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(await _bouquetsManager.SaveAsync(bouquet));
        }

        [HttpDelete]
        [Route("bouquet")]
        [Authorize]
        public async Task<IActionResult> Remove(int id)
        {
            await _bouquetsManager.RemoveAsync(id);
            return Ok();
        }
    }
}
