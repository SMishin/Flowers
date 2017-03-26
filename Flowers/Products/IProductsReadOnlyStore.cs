using System;
using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public interface IProductsReadOnlyStore 
	{
		Task<Product[]> GetAsync();
		Task<Product> GetAsync(int id);
		Task<Product[]> GetPublishedWithMainImageAsync(global::Flowers.Products.ProductType.ProductType productType, int skip, int take);
		Task<ProductImage[]> GetImagesAsync(int productId);
		Task<ProductImage> GetImageAsync(int imageId);
		Task<int> CountPublishedAsync(global::Flowers.Products.ProductType.ProductType productType);
	}
}