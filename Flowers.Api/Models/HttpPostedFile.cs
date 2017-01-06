namespace Flowers.Api.Models
{
	public class HttpPostedFile
	{
		public string Name { get; private set; }
		public byte[] Content { private set; get; }
		public string ContentType { get; private set; }

		public HttpPostedFile(string name, string contentType, byte[] content)
		{
			Name = name;
			ContentType = contentType;
			Content = content;
		}
	}
}
