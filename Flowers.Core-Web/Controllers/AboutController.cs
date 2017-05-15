using Microsoft.AspNetCore.Mvc;

namespace Flowers.CoreWeb.Controllers
{
	public class AboutController : Controller
	{
		[HttpGet]
        [Route("contacts")]
		public ActionResult Contacts()
		{
			return View("Contacts");
		}

        [HttpGet]
        [Route("delivery")]
        public ActionResult Delivery()
        {
            return View("Delivery");
        }
    }
}
