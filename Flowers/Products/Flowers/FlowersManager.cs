using System.Threading.Tasks;
using Flowers.BL.Products;

namespace Flowers.Products.Flowers
{
	public class FlowersManager : IFlowersManager
	{
		private readonly IProductsManager _productsManager;
		private readonly IFlowersStore _flowersStore;

        private int _pageSize = 6;

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

	    public Task<Flower[]> GetPublishedWithMainImageAsync(int page = 1)
	    {
	        return _flowersStore.GetPublishedWithMainImageAsync((page - 1) * _pageSize, _pageSize);
	    }
	}
}