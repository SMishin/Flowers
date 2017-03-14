using System.Threading.Tasks;

namespace Flowers.BL.Products.Flowers
{
	public interface IFlowersManager
	{
		Task<int> SaveAsync(Flower product);
	}
}