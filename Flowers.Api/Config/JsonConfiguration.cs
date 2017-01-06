using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Flowers.Api.Config
{
	public class JsonConfiguration
	{
		public static readonly Lazy<JsonSerializerSettings> LazySerializerSettings =
			new Lazy<JsonSerializerSettings>(CreateSettings);

		public static JsonSerializerSettings SerializerSettings => LazySerializerSettings.Value;

		public static void Configure(JsonSerializerSettings settings)
		{
			if (settings == null) throw new ArgumentNullException(nameof(settings));

			settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
			settings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
			settings.DefaultValueHandling = DefaultValueHandling.Populate;
			settings.NullValueHandling = NullValueHandling.Include;
			settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
			settings.MissingMemberHandling = MissingMemberHandling.Ignore;
		}

		private static JsonSerializerSettings CreateSettings()
		{
			var settings = new JsonSerializerSettings();
			Configure(settings);
			return settings;
		}
	}
}