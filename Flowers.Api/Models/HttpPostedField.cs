namespace Flowers.Api.Models
{
	public class HttpPostedField
	{
		public string Name { get; private set; }
		public string Value { get; private set; }

		public HttpPostedField(string name, string value)
		{
			Name = name;
			Value = value;
		}
	}
}