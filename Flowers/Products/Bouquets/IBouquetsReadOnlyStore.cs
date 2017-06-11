using System.Threading.Tasks;
using Flowers.Colors;

namespace Flowers.Products.Bouquets
{
	public interface IBouquetsReadOnlyStore
	{
		Task<Bouquet[]> GetAsync(ColorFilter colorsFilter = null);
		Task<Bouquet> GetAsync(int id);
		Task<Bouquet[]> GetPublishedWithMainImageAsync(int skip, int take, TypesFilter<BouquetType> filter = null, ColorFilter colorsFilter = null, PriceFilter priceFilter = null);
		Task<int> CountPublishedAsync(TypesFilter<BouquetType> filter = null, ColorFilter colorsFilter = null, PriceFilter priceFilter = null);
	}
}