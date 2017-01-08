using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public class ProductManager : IProductManager
	{
		private readonly IProductStore _productStore;

		public ProductManager(IProductStore productStore)
		{
			_productStore = productStore;
		}
		public Task SaveAsync(Product product)
		{
			return _productStore.SaveAsync(product);
		}
	}
}