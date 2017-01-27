using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public interface IProductStore: IProductReadOnlyStore
	{
		Task SaveAsync(Product product);
		Task AddImageAsync(int id, string imgUrl);
	}
}