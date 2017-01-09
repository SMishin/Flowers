using System;
using System.Reflection;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Flowers.BL.Products;
using Flowers.DAL.Products;

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
			builder.RegisterType<ProductReadOnlyStore>().As<IProductReadOnlyStore>();
			builder.RegisterType<ProductStore>().As<IProductStore>();
			builder.RegisterType<ProductManager>().As<IProductManager>()
				.WithParameter("imagesRootPath", System.Web.HttpContext.Current.Server.MapPath(AppSettings.Get("product-images-root-path")));
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