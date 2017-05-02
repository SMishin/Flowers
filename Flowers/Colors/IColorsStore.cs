using System.Threading.Tasks;

namespace Flowers.Colors
{
	public interface IColorsStore : IColorsReadOnlyStore
	{
		Task<int> SaveAsync(Color product);
		Task RemoveAsync(int id);
	}
}