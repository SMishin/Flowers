using System;
using Autofac;
using Autofac.Integration.Mvc;

namespace Flowers.Web
{
	public static class ContainerConfig
	{
		private static readonly Lazy<IContainer> container = new Lazy<IContainer>(Build, true);

		public static IContainer Container => container.Value;

		private static IContainer Build()
		{
			var builder = new ContainerBuilder();

			builder
				.RegisterTypes()
				.RegisterValidators()
				.RegisterWebApiControllers()
				.RegisterMvcControllers()
				.RegisterFilterProvider()
				;

			return builder.Build();
		}

		public static ContainerBuilder RegisterTypes(this ContainerBuilder builder)
		{
			return builder;
		}

		private static ContainerBuilder RegisterMvcControllers(this ContainerBuilder builder)
		{
			builder.RegisterControllers(typeof(MvcApplication).Assembly);
			return builder;
		}

		private static ContainerBuilder RegisterWebApiControllers(this ContainerBuilder builder)
		{
			//builder.RegisterApiControllers(Assembly.GetAssembly(typeof(WebApiConfig)));
			//builder.RegisterApiControllers(Assembly.GetAssembly(typeof(I18n.WebApi.WebApiConfig)));

			return builder;
		}

		private static ContainerBuilder RegisterValidators(this ContainerBuilder builder)
		{
			return builder;
		}
	}
}