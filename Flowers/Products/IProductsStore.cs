using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public interface IProductsStore : IProductsReadOnlyStore
	{
		Task<int> SaveAsync(Product product);
		Task<int> AddImageAsync(int id, string imgUrl);
		Task SetmMainImageAsync(int productId, int imageId);
		Task RemoveImageAsync(int imageId);
		Task RemoveImagesAsync(int productId);
		Task RemoveAsync(int id);
	}
}