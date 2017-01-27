using System.Web.Http;
using Autofac;
using Flowers.Api.Config;

namespace Flowers.Web
{
	public static class WebApiConfig
	{
		public static void Register(IContainer container)
		{
			GlobalConfiguration.Configure(config =>
			{
				Config.Register(config, ContainerConfig.Container);
			});
		}

	}
}