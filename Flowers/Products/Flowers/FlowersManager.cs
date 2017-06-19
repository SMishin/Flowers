using System;
using System.Threading.Tasks;
using Flowers.Colors;

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

			await _flowersStore.SaveAsync(flower);
			return id;
		}

		public async Task RemoveAsync(int id)
		{
			await _flowersStore.RemoveAsync(id);
			await _productsManager.RemoveAsync(id);
		}

		public async Task<PagedResult<Flower>> GetPublishedWithMainImageAsync(int page = 1, 
			TypesFilter<FlowersTypes> flowerTypeFilter = null, 
			ColorFilter colorsFilter = null, 
			PriceFilter priceFilter = null
			)
		{
			PagedResultsFactory factory = new PagedResultsFactory();

			var result = await factory.Create(
				(skip, take) => _flowersStore.GetPublishedWithMainImageAsync(skip, take, flowerTypeFilter, colorsFilter, priceFilter),
				() => _flowersStore.CountPublishedAsync(flowerTypeFilter, colorsFilter, priceFilter), 
				page);

			return result;
		}
	}
}