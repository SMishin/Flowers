using System.Threading.Tasks;

namespace Flowers.BL.Products.Flowers
{
	public class FlowersManager : IFlowersManager
	{
		private readonly IProductsManager _productsManager;
		private readonly IFlowersStore _flowersStore;

		public FlowersManager(IProductsManager productsManager, IFlowersStore flowersStore)
		{
			_productsManager = productsManager;
			_flowersStore = flowersStore;
		}
		public Task<int> SaveAsync(Flower flower)
		{
			return _flowersStore.SaveAsync(flower);
		}

		public async Task RemoveAsync(int id)
		{
			await _flowersStore.RemoveAsync(id);
			await _productsManager.RemoveAsync(id);
		}
	}
}