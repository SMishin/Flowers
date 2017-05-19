using System.IO;
using System.Threading.Tasks;
using Flowers.Products.ProductTypes;

namespace Flowers.Products
{
	public interface IProductsManager
	{
		Task<PagedResult<Product>> GetPublishedWithMainImageAsync(ProductType type, int page = 1);
		Task<int> SaveAsync(Product product);
		Task RemoveAsync(int id);
		Task<ProductImage> UploadImage(byte[] content, string contentType, int productId);
		Task<ProductImage> UploadImage(Stream stream, string contentType, int productId);
		Task SetMainImageAsync(int productId, int imageId);
		Task RemoveImageAsync(int imageId);
		Task SetColorsAsync(int productId, string[] colorIds);
	}
}
