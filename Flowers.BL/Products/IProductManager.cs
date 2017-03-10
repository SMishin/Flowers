using System;
using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public interface IProductManager
	{
		Task<int> SaveAsync(Product product);
		Task<ProductImage> UploadImage(byte[] content, string contentType, int productId);
		Task RemoveImageAsync (int id);
	}
}
