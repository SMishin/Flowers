using System.Threading.Tasks;
using Flowers.Products;

namespace Flowers.Colors
{
	public interface IColorsManager
	{
		Task SaveAsync(Color product);
		Task RemoveAsync(string id);
	}
}
