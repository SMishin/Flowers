using System;
using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public interface IProductManager
	{
		Task SaveAsync(Product product);
		Task<string> UploadImage(byte[] content, string contentType, int? id);
	}
}
