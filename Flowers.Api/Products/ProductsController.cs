using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Flowers.Api.Products
{
	public class ProductsController : ApiController
	{
		[HttpPut]
		[Route("products/{id}/image")]
		public async Task<IHttpActionResult> SaveImage(Guid id ,HttpRequestMessage request)
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

			return Ok();
		}
	}
}
