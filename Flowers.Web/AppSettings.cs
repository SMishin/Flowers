namespace Flowers.Web
{
	public static class AppSettings
	{
		public static string SiteDomain => System.Configuration.ConfigurationManager.AppSettings.Get("SiteDomain") ?? "";

		public static string Get(string key)
		{
			return System.Configuration.ConfigurationManager.AppSettings.Get(key) ?? "";
		}
	}
}