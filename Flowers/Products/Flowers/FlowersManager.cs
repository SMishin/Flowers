using System;
using System.Threading.Tasks;

namespace Flowers.Products.Flowers
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

		public async Task<int> SaveAsync(Flower flower)
		{
			var id = await _productsManager.SaveAsync(flower);

			if (id == 0)
			{
				id = flower.Id;
			}
			else
			{
				flower.Id = id;
			}

			await Task.WhenAll(_flowersStore.SaveAsync(flower), _productsManager.SetColorsAsync(id, flower.Colors));
			return id;
		}

		public async Task RemoveAsync(int id)
		{
			await _flowersStore.RemoveAsync(id);
			await _productsManager.RemoveAsync(id);
		}

		public async Task<PagedResult<Flower>> GetPublishedWithMainImageAsync(FlowersTypesFilter filter, int page = 1)
		{
			PagedResultsFactory factory = new PagedResultsFactory();

			var result = await factory.Create(
				(skip, take) => _flowersStore.GetPublishedWithMainImageAsync(filter, skip, take),
				() => _flowersStore.CountPublishedAsync(filter), 
				page);

			return result;
		}
	}
}