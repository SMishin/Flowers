using System;
using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public interface IProductReadOnlyStore
	{
		Task<Product[]> GetAsync();
		Task<Product> GetAsync(int id);
		Task<Product[]> GetWithMainImageAsync(ProductType.ProductType productType, int skip, int take);
		Task<ProductImage[]> GetImagesAsync(int id);
		Task<int> CountAsync(ProductType.ProductType productType);
	}
}