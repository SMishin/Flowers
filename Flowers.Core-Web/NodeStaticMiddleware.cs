using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.NodeServices;

namespace Flowers.CoreWeb
{
	public class NodeStaticMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly string _path;

		public NodeStaticMiddleware(RequestDelegate next, string path)
		{
			_next = next;
			_path = path;
		}

		public async Task Invoke(HttpContext context, INodeServices nodeServices)
		{
			var contentType = GetContentType(context.Request.Path.Value);

			if (contentType == null)
			{
				await _next(context);
				return;
			}

			var result = await nodeServices.InvokeAsync<string>("./wwwroot/server/app", _path + context.Request.Path.Value);
			context.Response.StatusCode = 200;

			context.Response.Headers["Content-Type"] = contentType;
			await context.Response.WriteAsync(result);

		}

		private string GetContentType(string requestUrl)
		{
			switch (System.Text.RegularExpressions.Regex.Match(requestUrl, @"\.(.*)$").Value)
			{
				case ".js":
				case ".jsx":
					{
						return "application/javascript";
					}
				case ".css":
					{
						return "text/css";
					}
				default:
					{
						return null;
					}
			}
		}
	}
}
