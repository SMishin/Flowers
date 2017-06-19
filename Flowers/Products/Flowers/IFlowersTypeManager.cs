using System.Threading.Tasks;

namespace Flowers.Products.Flowers
{
    public interface IFlowersTypeManager
    {
        Task<int> SaveAsync(FlowerType flowerType);
        Task RemoveAsync(int id);
    }
}