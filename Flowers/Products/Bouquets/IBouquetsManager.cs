using System.Threading.Tasks;
using Flowers.Colors;

namespace Flowers.Products.Bouquets
{
	public interface IBouquetsManager
	{
		Task<int> SaveAsync(Bouquet bouquet);
		Task RemoveAsync(int id);
		Task<PagedResult<Bouquet>> GetPublishedWithMainImageAsync(int page, TypesFilter<BouquetType> bouquetsTypesFilter = null, ColorFilter colorsFilter = null, PriceFilter priceFilter = null);
		Task AddFlower(int id,int flowerId);
		Task<int[]> GetFlowers(int id);
		Task RemoveFlower(int id, int flowerId);
	}
}