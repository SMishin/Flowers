using System.Threading.Tasks;

namespace Flowers.Products.ProductComposition
{
	public class ProductCompositionManager : IProductCompositionManager
	{
		private readonly IProductCompositionStore _productCompositionStore;

		public ProductCompositionManager(IProductCompositionStore productCompositionStore)
		{
			_productCompositionStore = productCompositionStore;
		}
		public Task Add(int mainProductId, int productId, int count = 1)
		{
			return _productCompositionStore.Add(mainProductId, productId, count);
		}
	}
}