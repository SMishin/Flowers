using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Flowers.Api.Models;

namespace Flowers.Api
{
	public static class HttpContentExtensions
	{
		public static async Task<HttpPostedData> ParseMultipartAsync(this HttpContent postedContent)
		{
			var provider = await postedContent.ReadAsMultipartAsync();

			var files = new Dictionary<string, HttpPostedFile>(StringComparer.InvariantCultureIgnoreCase);
			var fields = new Dictionary<string, HttpPostedField>(StringComparer.InvariantCultureIgnoreCase);

			foreach (var content in provider.Contents)
			{
				string fieldName = content.Headers.ContentDisposition.Name.Trim('"');
				if (!string.IsNullOrEmpty(content.Headers.ContentDisposition.FileName))
				{
					byte[] contentData = await content.ReadAsByteArrayAsync();
					string name = content.Headers.ContentDisposition.FileName.Trim('"');
					string contentType = content.Headers.ContentType.MediaType;
					files.Add(fieldName, new HttpPostedFile(name, contentType, contentData));
				}
				else
				{
					string data = await content.ReadAsStringAsync();
					fields.Add(fieldName, new HttpPostedField(fieldName, data));
				}
			}

			return new HttpPostedData(fields, files);
		}
	}
}