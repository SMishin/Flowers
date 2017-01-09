namespace Flowers.Web
{
	public static class AppSettings
	{
		public static string Get(string key)
		{
			return System.Configuration.ConfigurationManager.AppSettings.Get(key) ?? "";
		}
	}
}