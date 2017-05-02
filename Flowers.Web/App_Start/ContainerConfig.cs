using System;
using System.Reflection;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Flowers.Data.Products;
using Flowers.Data.Products.Flowers;
using Flowers.Products;
using Flowers.Products.Flowers;

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
			builder.RegisterType<ProductsReadOnlyStore>().As<IProductsReadOnlyStore>();
			builder.RegisterType<ProductsStore>().As<IProductsStore>();
			builder.RegisterType<ProductsManager>().As<IProductsManager>()
				.WithParameter("imagesRootPath", System.Web.HttpContext.Current.Server.MapPath(AppSettings.Get("product-images-root-path")));

			builder.RegisterType<FlowersReadOnlyStore>().As<IFlowersReadOnlyStore>();
			builder.RegisterType<FlowersStore>().As<IFlowersStore>();
			builder.RegisterType<FlowersManager>().As<IFlowersManager>()
			;

			return builder;
		}

		private static ContainerBuilder RegisterMvcControllers(this ContainerBuilder builder)
		{
			builder.RegisterControllers(typeof(MvcApplication).Assembly);
			return builder;
		}

		private static ContainerBuilder RegisterWebApiControllers(this ContainerBuilder builder)
		{
			builder.RegisterApiControllers(Assembly.GetAssembly(typeof(Api.Config.Config)));
			//builder.RegisterApiControllers(Assembly.GetAssembly(typeof(I18n.WebApi.WebApiConfig)));

			return builder;
		}

		private static ContainerBuilder RegisterValidators(this ContainerBuilder builder)
		{
			return builder;
		}
	}
}