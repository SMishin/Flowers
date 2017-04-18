using System.Web.Mvc;

namespace Flowers.Web.Controllers
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
