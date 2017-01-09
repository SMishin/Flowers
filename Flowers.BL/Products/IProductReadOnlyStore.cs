using System;
using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public interface IProductReadOnlyStore
	{
		Task<Product[]> GetAsync();
		Task<Product> GetAsync(int id);
		Task<ProductImage[]> GetImagesAsync(int id);
	}
}