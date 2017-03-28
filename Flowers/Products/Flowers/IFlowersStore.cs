using System.Threading.Tasks;

namespace Flowers.Products.Flowers
{
	public interface IFlowersStore : IFlowersReadOnlyStore
	{
		Task<int> SaveAsync(Flower product);
		Task RemoveAsync(int id);
	}
}