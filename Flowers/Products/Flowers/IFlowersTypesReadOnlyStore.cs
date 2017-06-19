using System.Threading.Tasks;

namespace Flowers.Products.Flowers
{
	public interface IFlowersTypesReadOnlyStore
	{
		Task<FlowerType[]> Get();
	}
}