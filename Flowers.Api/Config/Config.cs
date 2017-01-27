using System.Net.Http.Headers;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.AspNet.Identity;

namespace Flowers.Api.Config
{
	public class Config
	{
		public static void Register(HttpConfiguration config, IContainer container)
		{
			config.DependencyResolver = new AutofacWebApiDependencyResolver(container.BeginLifetimeScope());


			JsonConfiguration.Configure(config.Formatters.JsonFormatter.SerializerSettings);
			config.Formatters
				.JsonFormatter
				.SupportedMediaTypes
				.Add(new MediaTypeHeaderValue("text/html"));

			//HttpConfiguration.EnableCors(new EnableCorsAttribute("*", "*", "*"));
			config.SuppressDefaultHostAuthentication();
			config.Filters.Add(new HostAuthenticationFilter(DefaultAuthenticationTypes.ApplicationCookie));

			// Web API routes
			config.MapHttpAttributeRoutes();

			config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);
		}
	}
}
