using System.Web.Mvc;

namespace Flowers.Web.Core
{
	public static class StaticVersionHtmlHelper
	{
		private static readonly string Version;

		static StaticVersionHtmlHelper()
		{
			Version = System.Configuration.ConfigurationManager.AppSettings["static-version"];
		}

		public static string GetStaticVersion(this HtmlHelper htmlHelper)
		{
			return Version;
		}
	}
}