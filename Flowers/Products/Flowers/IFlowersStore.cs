using System.Threading.Tasks;
using Flowers.BL.Products.Flowers;

namespace Flowers.Products.Flowers
{
	public interface IFlowersStore : IFlowersReadOnlyStore
	{
		Task<int> SaveAsync(Flower product);
		Task RemoveAsync(int id);
	}
}