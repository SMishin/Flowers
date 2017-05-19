using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Flowers.CoreWeb
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel(options =>
	            {
		            options.AddServerHeader = false;
	            })
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseApplicationInsights()
				//.UseEnvironment("Development")
				.Build();

            host.Run();
        }
    }
}
