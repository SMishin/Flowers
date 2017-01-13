using System;
using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public interface IProductReadOnlyStore
	{
		Task<Product[]> GetAsync();
		Task<Product> GetAsync(int id);
		Task<Product[]> GetWithMainImageAsync(ProductType productType);
		Task<ProductImage[]> GetImagesAsync(int id);
	}
}