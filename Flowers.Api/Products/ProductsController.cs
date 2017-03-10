using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Flowers.BL.Products;

namespace Flowers.Api.Products
{
	[RoutePrefix("api")]
	public class ProductsController : ApiController
	{
		private readonly IProductManager _productManager;
		private readonly IProductReadOnlyStore _productStore;

		public ProductsController(IProductManager productManager, IProductReadOnlyStore productStore)
		{
			_productManager = productManager;
			_productStore = productStore;
		}

		[HttpGet]
		[Route("products")]
		public async Task<IHttpActionResult> Get()
		{
			var data = await _productStore.GetAsync();
			return Ok(data);
		}

		[HttpGet]
		[Route("product/{id:int}")]
		public async Task<IHttpActionResult> Get(int id)
		{
			var data = await _productStore.GetAsync(id);
			return Ok(data);
		}

		[HttpPost]
		[Route("product")]
		//[Authorize]
		public async Task<IHttpActionResult> Save(Product product)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			return Ok(await _productManager.SaveAsync(product));
		}

		[HttpGet]
		[Route("product/{id:int}/images")]
		public async Task<IHttpActionResult> Images(int id)
		{
			ProductImage[] data = await _productStore.GetImagesAsync(id);
			return Ok(data);
		}

		[HttpPut]
		[Route("product/{id:int}/image")]
		[Route("product/image")]
		//[Authorize]
		public async Task<IHttpActionResult> SaveImage(int id, HttpRequestMessage request)
		{
			if (!request.Content.IsMimeMultipartContent())
			{
				throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
			}

			var data = await Request.Content.ParseMultipartAsync();
			if (!data.Files.ContainsKey("file"))
			{
				throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
			}

			var file = data.Files[data.Files.Keys.First()];

			var img = await _productManager.UploadImage(file.Content, file.ContentType, id);

			return Ok(img);
		}

		[HttpDelete]
		[Route("product/image")]
		//[Authorize]
		public async Task<IHttpActionResult> Remove(int id)
		{
			await _productManager.RemoveImageAsync(id);
			return Ok();
		}
	}
}
