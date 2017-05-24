using System.Threading.Tasks;

namespace Flowers.Products.Bouquets
{
    public interface IBouquetsManager 
	{
        Task<PagedResult<Bouquet>> GetPublishedWithMainImageAsync(TypesFilter<BouquetType> filter, int page = 1);
        Task<int> SaveAsync(Bouquet bouquet);
        Task RemoveAsync(int id);
    }
}