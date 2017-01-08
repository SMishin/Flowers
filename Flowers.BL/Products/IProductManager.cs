using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public interface IProductManager
	{
		Task SaveAsync(Product product);
	}
}
