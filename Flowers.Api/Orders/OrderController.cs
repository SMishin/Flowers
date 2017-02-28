using System.Web.Http;
using Flowers.BL.Orders;

namespace Flowers.Api.Orders
{
	[RoutePrefix("api/orders")]
	public class OrderController : ApiController
	{
		[HttpPost]
		[Route("")]
		public IHttpActionResult Post(Order product)
		{
			return Ok();
		}

	}
}
