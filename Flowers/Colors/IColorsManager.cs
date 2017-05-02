using System.Threading.Tasks;
using Flowers.Products;

namespace Flowers.Colors
{
	public interface IColorsManager
	{
		Task<int> SaveAsync(Product product);
		Task RemoveAsync(int id);
	}
}
