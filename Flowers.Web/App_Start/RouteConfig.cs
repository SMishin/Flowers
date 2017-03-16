using System.Web.Mvc;
using System.Web.Routing;

namespace Flowers.Web
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			routes.MapRoute(
				name: null,
				url: "flowers",
				defaults: new { controller = "Flowers", action = "Index"},
				namespaces: new[] { "Flowers.Web.Controllers" }
			);
			routes.MapRoute(
				name: null,
				url: "flowers/{id}",
				defaults: new { controller = "Flowers", action = "Details", id = UrlParameter.Optional },
				namespaces: new[] { "Flowers.Web.Controllers" }
			);

			routes.MapMvcAttributeRoutes();

			routes.MapRoute(
				name: "Default",
				url: "{controller}/{action}/{id}",
				defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
				namespaces: new[] { "Flowers.Web.Controllers" }
			);
		}
	}
}
