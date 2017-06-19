using System.Threading.Tasks;

namespace Flowers.Products.Flowers
{
	public interface IFlowersTypesStore : IFlowersTypesReadOnlyStore
	{
		Task<int> SaveAsync(FlowerType flowerType);
		Task RemoveAsync(int id);
	}
}