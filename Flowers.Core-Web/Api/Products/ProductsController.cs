using System.Collections.Generic;
using System.Threading.Tasks;
using Flowers.Products;
using Flowers.Products.ProductTypes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Api.Products
{
	[Route("api")]
	public class ProductsController : Controller
	{
		private readonly IProductsManager _productsManager;
		private readonly IProductsReadOnlyStore _productsStore;

		public ProductsController(IProductsManager productsManager, IProductsReadOnlyStore productsStore)
		{
			_productsManager = productsManager;
			_productsStore = productsStore;
		}

		[HttpGet]
		[Route("products")]
		public async Task<ActionResult> Get(ProductType type, int page = 1)
		{
			var data = await _productsStore.GetAsync(type);
			return Ok(data);
		}

		[HttpGet]
		[Route("products/published")]
		public async Task<IActionResult> GetPublishedWithMainImageAsync(ProductType type, int page = 1)
		{
			var data = await _productsManager.GetPublishedWithMainImageAsync(type, page);
			return Ok(data);
		}

		[HttpGet]
		[Route("product/{id:int}")]
		public async Task<IActionResult> Get(int id)
		{
			var data = await _productsStore.GetAsync(id);
			return Ok(data);
		}

		[HttpPost]
		[Route("product")]
		[Microsoft.AspNetCore.Authorization.Authorize]
		public async Task<IActionResult> Save([FromBody]Product product)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			return Ok(await _productsManager.SaveAsync(product));
		}

		[HttpGet]
		[Route("product/{id:int}/images")]
		public async Task<IActionResult> Images(int id)
		{
			ProductImage[] data = await _productsStore.GetImagesAsync(id);
			return Ok(data);
		}


		[HttpPost]
		[Route("product/{productId:int}/image/main")]
		public async Task<IActionResult> Main(int productId, int imageId)
		{
			await _productsManager.SetMainImageAsync(productId, imageId);
			return Ok();
		}

		[HttpPut]
		[Route("product/{id:int}/image")]
		[Route("product/image")]
		[Microsoft.AspNetCore.Authorization.Authorize]
		public async Task<IActionResult> SaveImage(int id, ICollection<IFormFile> files)
		{
			///MultipartRequestHelper.
			//if (!request.Content.IsMimeMultipartContent())
			//{
			//	throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
			//}


			//var data = await Request.HttpContext.ParseMultipartAsync();
			//if (!data.Files.ContainsKey("file"))
			//{
			//	throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
			//}

			//var file = data.Files[data.Files.Keys.First()];

			//var img = await _productsManager.UploadImage(file.Content, file.ContentType, id);

			//return Ok(img);
			return Ok();
		}

		[HttpDelete]
		[Route("product")]
		[Microsoft.AspNetCore.Authorization.Authorize]
		public async Task<IActionResult> Remove(int id)
		{
			await _productsManager.RemoveAsync(id);
			return Ok();
		}

		[HttpDelete]
		[Route("product/image")]
		[Microsoft.AspNetCore.Authorization.Authorize]
		public async Task<IActionResult> RemoveImage(int id)
		{
			await _productsManager.RemoveImageAsync(id);
			return Ok();
		}
	}
}
