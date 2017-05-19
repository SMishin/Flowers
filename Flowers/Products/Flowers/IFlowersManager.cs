using System.Threading.Tasks;

namespace Flowers.Products.Flowers
{
    public interface IFlowersManager
    {
        Task<PagedResult<Flower>> GetPublishedWithMainImageAsync(FlowersTypesFilter filter, int page = 1);
        Task<int> SaveAsync(Flower product);
        Task RemoveAsync(int id);
    }
}