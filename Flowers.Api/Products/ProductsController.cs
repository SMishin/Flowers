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
		private readonly IProductReadOnlyStore _productReadOnlyStore;

		public ProductsController(IProductManager productManager, IProductReadOnlyStore productReadOnlyStore)
		{
			_productManager = productManager;
			_productReadOnlyStore = productReadOnlyStore;
		}

		[HttpGet]
		[Route("products")]
		public async Task<IHttpActionResult> Get()
		{
			var data = await _productReadOnlyStore.GetAsync();
			return Ok(data);
		}

		[HttpGet]
		[Route("product/{id:int}")]
		public async Task<IHttpActionResult> Get(int id)
		{
			var data = await _productReadOnlyStore.GetAsync(id);
			return Ok(data);
		}

		[HttpPost]
		[Route("product")]
		public async Task<IHttpActionResult> Save(Product product)
		{

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			await _productManager.SaveAsync(product);
			return Ok();
		}


		[HttpGet]
		[Route("product/{id:int}/images")]
		public async Task<IHttpActionResult> SaveImage(int id)
		{
			ProductImage[] data = await _productReadOnlyStore.GetImagesAsync(id);
			return Ok(data);
		}

		[HttpPut]
		[Route("product/{id:int}/image")]
		[Route("product/image")]
		public async Task<IHttpActionResult> SaveImage(int? id, HttpRequestMessage request)
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

			var imgUrl = await _productManager.UploadImage(file.Content, file.ContentType, id);

			return Ok(imgUrl);
		}
	}
}
