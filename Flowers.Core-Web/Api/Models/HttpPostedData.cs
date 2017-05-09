using System.Collections.Generic;

namespace Flowers.CoreWeb.Api.Models
{
	public class HttpPostedData
	{
		public HttpPostedData(IDictionary<string, HttpPostedField> fields, IDictionary<string, HttpPostedFile> files)
		{
			Fields = fields;
			Files = files;
		}

		public IDictionary<string, HttpPostedField> Fields { get; private set; }
		public IDictionary<string, HttpPostedFile> Files { get; private set; }
	}
}