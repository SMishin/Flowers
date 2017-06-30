using System.Threading.Tasks;
using Flowers.Colors;
using Flowers.Products.Flowers;

namespace Flowers.Products.Bouquets
{
	public interface IBouquetsReadOnlyStore
	{
		Task<Bouquet[]> GetAsync(ColorFilter colorsFilter = null);
		Task<Bouquet> GetAsync(int id);
		Task<Bouquet[]> GetPublishedWithMainImageAsync(int skip, int take, TypesFilter<BouquetType> filter = null, ColorFilter colorsFilter = null, PriceFilter priceFilter = null);
		Task<int> CountPublishedAsync(TypesFilter<BouquetType> filter = null, ColorFilter colorsFilter = null, PriceFilter priceFilter = null);
		Task<int[]> GetFlowersIds(int id);
		Task<Flower[]> GetFlowers(int id);
	}
}