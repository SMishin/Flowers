using System.Threading.Tasks;

namespace Flowers.Colors
{
	public interface IColorsReadOnlyStore 
	{
		Task<Color[]> GetAsync();
		Task<Color> GetAsync(int id);
	}
}