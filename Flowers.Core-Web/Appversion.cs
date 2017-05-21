using System.Reflection;

namespace Flowers.CoreWeb
{
	public static class Appversion
	{
		public static string Value => typeof(Startup)
			.GetTypeInfo()
			.Assembly
			.GetCustomAttribute<AssemblyInformationalVersionAttribute>()
			.InformationalVersion;
	}
}
