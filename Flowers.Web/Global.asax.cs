using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Autofac.Integration.Mvc;
using Flowers.Api;
using Flowers.Api.Config;

namespace Flowers.Web
{
	public class MvcApplication : HttpApplication
	{
		protected void Application_Start()
		{
			ViewEngineConfig.Configure();
			Config.Register(ContainerConfig.Container);

			DependencyResolver.SetResolver(new AutofacDependencyResolver(ContainerConfig.Container));

			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			RouteConfig.RegisterRoutes(RouteTable.Routes);
		}
	}
}
