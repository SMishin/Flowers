using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public interface IProductStore : IProductReadOnlyStore
	{
		Task<int> SaveAsync(Product product);
		Task<int> AddImageAsync(int id, string imgUrl);
		Task RemoveImageAsync(int id);
	}
}