using System.Threading.Tasks;

namespace Flowers.Products.Bouquets
{
	public interface IBouquetsStore : IBouquetsReadOnlyStore
	{
		Task SaveAsync(Bouquet product);
		Task RemoveAsync(int id);
		Task RemoveFlower(int id, int flowerId);
	}
}