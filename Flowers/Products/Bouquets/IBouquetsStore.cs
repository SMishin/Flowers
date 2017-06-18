using System.Threading.Tasks;

namespace Flowers.Products.Bouquets
{
	public interface IBouquetsStore : IBouquetsReadOnlyStore
	{
		Task SaveAsync(Bouquet product);
		Task RemoveAsync(int id);
		Task AddFlower(int id, int flowerId);
		Task RemoveFlower(int id, int flowerId);
	}
}