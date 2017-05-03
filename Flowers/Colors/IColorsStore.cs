using System.Threading.Tasks;

namespace Flowers.Colors
{
	public interface IColorsStore : IColorsReadOnlyStore
	{
		Task SaveAsync(Color product);
		Task RemoveAsync(string id);
	}
}