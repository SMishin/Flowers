using System.Threading.Tasks;
using Flowers.Colors;

namespace Flowers.Products.Flowers
{
    public interface IFlowersManager
    {
        Task<PagedResult<Flower>> GetPublishedWithMainImageAsync(int page = 1, TypesFilter<FlowersTypes> flowerTypeFilter = null, ColorFilter colorsFilter = null, PriceFilter priceFilter = null);
        Task<int> SaveAsync(Flower product);
        Task RemoveAsync(int id);
    }
}