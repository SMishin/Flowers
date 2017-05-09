using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.NodeServices;

namespace Flowers.CoreWeb
{
    public class NodeStaticMiddleware
    {
		private readonly RequestDelegate _next;
	    private readonly INodeServices _nodeServices;

	    public NodeStaticMiddleware(RequestDelegate next, INodeServices nodeServices)
	    {
		    _next = next;
		    _nodeServices = nodeServices;
	    }

		public async Task Invoke(HttpContext context)
		{
			if (context.Request.Path.HasValue && context.Request.Path.Value.IndexOf(".js") != -1)
			{
				var result = await _nodeServices.InvokeAsync<string>("./wwwroot/server/app", context.Request.Path.Value);
				context.Response.Headers["Content-Type"] = "application/javascript";
				await context.Response.WriteAsync(result.ToString());
				return;
			}

			// Call the next delegate/middleware in the pipeline
			await this._next(context);
		}
	}
}
