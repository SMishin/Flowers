using System.Threading.Tasks;

namespace Flowers.Products.Flowers
{
	public interface IFlowersReadOnlyStore
	{
		Task<Flower[]> GetAsync();
		Task<Flower> GetAsync(int id);
		Task<Flower[]> GetPublishedWithMainImageAsync(int skip, int take);
		Task<Flower[]> GetRandomPublishedWithMainImageAsync(int count);
	}
}