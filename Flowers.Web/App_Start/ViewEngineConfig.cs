using System.Linq;
using System.Web.Mvc;

namespace Flowers
{
	public class ViewEngineConfig
	{
		public static void Configure()
		{
			var locationFormats = new[]
			{
				"~/{2}/Views/{1}/{0}.cshtml",
						"~/{2}/Views/Shared/{0}.cshtml"
			};

			var razorEngine = new RazorViewEngine();

			razorEngine.AreaViewLocationFormats = razorEngine.AreaViewLocationFormats
				  .Concat(locationFormats).ToArray();

			razorEngine.AreaMasterLocationFormats = razorEngine.AreaMasterLocationFormats
				  .Concat(locationFormats).ToArray();

			razorEngine.AreaPartialViewLocationFormats = razorEngine.AreaPartialViewLocationFormats
				  .Concat(locationFormats).ToArray();


			ViewEngines.Engines.Clear();
			ViewEngines.Engines.Add(razorEngine);
		}
	}
}