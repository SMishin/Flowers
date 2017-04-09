using System.Threading.Tasks;

namespace Flowers.Products.Flowers
{
	public interface IFlowersReadOnlyStore
	{
		Task<Flower[]> GetAsync();
		Task<Flower> GetAsync(int id);
		Task<Flower[]> GetPublishedWithMainImageAsync(FlowersFilter filter, int skip, int take);
		Task<Flower[]> GetRandomPublishedWithMainImageAsync(int count);
        Task<int> CountPublishedAsync(FlowersFilter filter);
    }
}