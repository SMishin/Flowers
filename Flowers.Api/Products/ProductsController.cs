using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Flowers.Products;
using Flowers.Products.ProductTypes;

namespace Flowers.Api.Products
{
	[RoutePrefix("api")]
	public class ProductsController : ApiController
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
		public async Task<IHttpActionResult> Get(ProductType type, int page = 1)
		{
			var data = await _productsStore.GetAsync(type);
			return Ok(data);
		}

		[HttpGet]
		[Route("products/published")]
		public async Task<IHttpActionResult> GetPublishedWithMainImageAsync(ProductType type, int page = 1)
		{
			var data = await _productsManager.GetPublishedWithMainImageAsync(type, page);
			return Ok(data);
		}

		[HttpGet]
		[Route("product/{id:int}")]
		public async Task<IHttpActionResult> Get(int id)
		{
			var data = await _productsStore.GetAsync(id);
			return Ok(data);
		}

		[HttpPost]
		[Route("product")]
		[Authorize]
		public async Task<IHttpActionResult> Save(Product product)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			return Ok(await _productsManager.SaveAsync(product));
		}

		[HttpGet]
		[Route("product/{id:int}/images")]
		public async Task<IHttpActionResult> Images(int id)
		{
			ProductImage[] data = await _productsStore.GetImagesAsync(id);
			return Ok(data);
		}


		[HttpPost]
		[Route("product/{productId:int}/image/main")]
		public async Task<IHttpActionResult> Main(int productId, int imageId)
		{
			await _productsManager.SetMainImageAsync(productId, imageId);
			return Ok();
		}

		[HttpPut]
		[Route("product/{id:int}/image")]
		[Route("product/image")]
		[Authorize]
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

			var img = await _productsManager.UploadImage(file.Content, file.ContentType, id);

			return Ok(img);
		}

		[HttpDelete]
		[Route("product")]
		[Authorize]
		public async Task<IHttpActionResult> Remove(int id)
		{
			await _productsManager.RemoveAsync(id);
			return Ok();
		}

		[HttpDelete]
		[Route("product/image")]
		[Authorize]
		public async Task<IHttpActionResult> RemoveImage(int id)
		{
			await _productsManager.RemoveImageAsync(id);
			return Ok();
		}
	}
}
