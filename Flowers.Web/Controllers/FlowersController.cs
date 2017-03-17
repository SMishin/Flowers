﻿using System.Threading.Tasks;
using System.Web.Mvc;
using Flowers.BL.Products;
using Flowers.BL.Products.Flowers;
using Flowers.BL.Products.ProductType;
using Flowers.Web.Models.Flowers;
using Flowers.Web.Models.Products;

namespace Flowers.Web.Controllers
{
	//[RoutePrefix("flowers")]
	public class FlowersController : Controller
	{
		private int _pageSize = 6;
		private readonly IFlowersReadOnlyStore _flowersReadOnlyStore;
		private readonly IProductsReadOnlyStore _productsReadOnlyStore;

		public FlowersController(IFlowersReadOnlyStore flowersReadOnlyStore, IProductsReadOnlyStore productsReadOnlyStore)
		{
			_flowersReadOnlyStore = flowersReadOnlyStore;
			_productsReadOnlyStore = productsReadOnlyStore;
		}


		[HttpGet]
		public async Task<ActionResult> Index(int page = 1)
		{
			var products = _flowersReadOnlyStore.GetPublishedWithMainImageAsync((page - 1) * _pageSize, page * _pageSize);
			var count = _productsReadOnlyStore.CountPublishedAsync(ProductType.Flowers);

			await Task.WhenAll(products, count);

			var data = new FlowersIndexViewModel
			{
				Products = products.Result,
				Count = count.Result,
				Page = page
			};

			return View(data);
		}


		//[Route("{id:int}")]
		[HttpGet]
		public async Task<ActionResult> Details(int id)
		{
			var product = _flowersReadOnlyStore.GetAsync(id);
			var images = _productsReadOnlyStore.GetImagesAsync(id);
			var otherProducts = _productsReadOnlyStore.GetPublishedWithMainImageAsync(ProductType.Flowers, 0, 6);

			await Task.WhenAll(product, images, otherProducts);

			if (product.Result == null)
			{
				return HttpNotFound();
			}

			var data = new FlowersDetailsViewModel
			{
				Product = product.Result,
				ProductImages = images.Result,
				OtherProducts = otherProducts.Result
			};

			return View("Details", data);
		}
	}
}