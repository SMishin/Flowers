using System.Threading.Tasks;
using Flowers.Colors;

namespace Flowers.Products.Flowers
{
	public interface IFlowersReadOnlyStore
	{
		Task<Flower[]> GetAsync();
		Task<Flower> GetAsync(int id);
		Task<Flower[]> GetPublishedWithMainImageAsync(int skip, int take, TypesFilter<FlowerType> flowersTypesFilter = null, ColorFilter colorFilter = null);
		Task<Flower[]> GetRandomPublishedWithMainImageAsync(int count);
        Task<int> CountPublishedAsync(TypesFilter<FlowerType> flowersTypesFilter = null, ColorFilter colorsFilter = null);
    }
}