using System.Collections.Generic;
using System.Threading.Tasks;
using Flowers.Products.Flowers;
using Flowers.Products.ProductTypes;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly IFlowersReadOnlyStore _flowersReadOnlyStore;

        public HomeController(IFlowersReadOnlyStore flowersReadOnlyStore)
        {
            _flowersReadOnlyStore = flowersReadOnlyStore;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {

            var flowers = _flowersReadOnlyStore.GetRandomPublishedWithMainImageAsync(12);
            //var toys = _productsReadOnlyStore.GetPublishedWithMainImageAsync(ProductType.Toys, 0, 12);

            await Task.WhenAll(flowers); //, toys);

            var data = new Dictionary<ProductType, Flower[]>
            {
                {ProductType.Flowers, flowers.Result},
				//{ProductType.Toys, toys.Result}
			};

            return View(data);
        }
    }
}
