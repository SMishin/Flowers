using System;
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


		[HttpPut]
		[Route("product/{id}/image")]
		[Route("product/image")]
		public async Task<IHttpActionResult> SaveImage(Guid? id, HttpRequestMessage request)
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

			//translationFilesManager.UploadFile(data.Files[data.Files.Keys.First()].Content, data.Fields["path"].Value);

			return Ok(id);
		}
	}
}
