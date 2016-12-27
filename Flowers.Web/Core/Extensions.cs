using System.Web.Mvc;

namespace Flowers.Web.Core
{
	public static class Extensions
	{

		public static bool IsDebug(this HtmlHelper htmlHelper)
		{
#if DEBUG
			return true;
#else
            return false;
#endif
		}

		public static string ResolvePath(this HtmlHelper htmlHelper, string path)
		{
			return !htmlHelper.IsDebug() ? path.Replace("/app/", "/dist/") : path;
		}
	}
}