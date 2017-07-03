using System.Threading.Tasks;

namespace Flowers.Products.ProductComposition
{
	public interface IProductCompositionManager
	{
		
		Task Add(int mainProductId, int productId, int count = 1);
		
	}
}
