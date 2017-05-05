using System.Threading.Tasks;
using Flowers.Products.ProductTypes;

namespace Flowers.Products
{
	public interface IProductsReadOnlyStore 
	{
		Task<Product[]> GetAsync();
		Task<Product[]> GetAsync(ProductType type);
		Task<Product> GetAsync(int id);
		Task<Product[]> GetPublishedWithMainImageAsync(ProductType productType, int skip, int take);
		Task<ProductImage[]> GetImagesAsync(int productId);
		Task<ProductImage> GetImageAsync(int imageId);
		Task<int> CountPublishedAsync(ProductType productType);
	}
}