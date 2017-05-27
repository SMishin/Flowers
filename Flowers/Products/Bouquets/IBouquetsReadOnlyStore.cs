using System.Threading.Tasks;

namespace Flowers.Products.Bouquets
{
	public interface IBouquetsReadOnlyStore
	{
		Task<Bouquet[]> GetAsync();
		Task<Bouquet> GetAsync(int id);
		Task<Bouquet[]> GetPublishedWithMainImageAsync(TypesFilter<BouquetType> filter, int skip, int take);
		Task<int> CountPublishedAsync(TypesFilter<BouquetType> filter);
	}
}