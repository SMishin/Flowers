using System.Threading.Tasks;
using Flowers.Colors;

namespace Flowers.Products.Flowers
{
	public interface IFlowersReadOnlyStore
	{
		Task<Flower[]> GetAsync(ColorFilter colorsFilter = null);
		Task<Flower> GetAsync(int id);
		Task<Flower[]> GetPublishedWithMainImageAsync(int skip, int take, TypesFilter<FlowersTypes> flowersTypesFilter = null, ColorFilter colorFilter = null, PriceFilter priceFilter = null);
		Task<Flower[]> GetRandomPublishedWithMainImageAsync(int count);
        Task<int> CountPublishedAsync(TypesFilter<FlowersTypes> flowersTypesFilter = null, ColorFilter colorsFilter = null, PriceFilter priceFilter = null);
    }
}