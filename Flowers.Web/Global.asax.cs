using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Autofac.Integration.Mvc;

namespace Flowers.Web
{
	public class MvcApplication : HttpApplication
	{
		protected void Application_Start()
		{
			ViewEngineConfig.Configure();
			WebApiConfig.Register(ContainerConfig.Container);

			DependencyResolver.SetResolver(new AutofacDependencyResolver(ContainerConfig.Container));

			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			RouteConfig.RegisterRoutes(RouteTable.Routes);
		}
	}
}
