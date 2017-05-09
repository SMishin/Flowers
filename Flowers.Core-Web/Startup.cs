using System.IO;
using Flowers.CoreWeb.Data;
using Flowers.CoreWeb.Models;
using Flowers.CoreWeb.Services;
using Flowers.Data;
using Flowers.Data.Products;
using Flowers.Data.Products.Flowers;
using Flowers.Products;
using Flowers.Products.Flowers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Flowers.CoreWeb
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see https://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Flowers.DB")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc();

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            services.AddTransient<ISqlConnectionHelper, SqlConnectionHelper>(factory=> new SqlConnectionHelper(Configuration.GetConnectionString("Flowers.DB"))); 
            services.AddTransient<IProductsReadOnlyStore, ProductsReadOnlyStore>();
			services.AddTransient<IProductsStore, ProductsStore>();
			services.AddTransient<IProductsManager, ProductsManager>(factory=> new ProductsManager(factory.GetService<IProductsStore>(),
				Path.Combine(Directory.GetCurrentDirectory(), Configuration.GetConnectionString("product-images-root-path"))));
     

            services.AddTransient<IFlowersReadOnlyStore, FlowersReadOnlyStore>();
            services.AddTransient<IFlowersManager, FlowersManager>();
            services.AddTransient<IFlowersStore, FlowersStore>();
           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseWebpackDevMiddleware(new Microsoft.AspNetCore.SpaServices.Webpack.WebpackDevMiddlewareOptions
                {
					HotModuleReplacement = true,
					ConfigFile = @"webpack.config.js",
                    ProjectPath = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot"),

                });
                //app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseIdentity();

            // Add external authentication middleware below. To configure them please see https://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
