using System.Threading.Tasks;

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

		public async Task<int> SaveAsync(Flower flower)
		{
			await _productsManager.SetColorsAsync(flower.Id, flower.Colors);
			return await _flowersStore.SaveAsync(flower);
		}

		public async Task RemoveAsync(int id)
		{
			await _flowersStore.RemoveAsync(id);
			await _productsManager.RemoveAsync(id);
		}

		public async Task<PagedResult<Flower>> GetPublishedWithMainImageAsync(FlowersFilter filter, int page = 1)
		{
			var dataTask = _flowersStore.GetPublishedWithMainImageAsync(filter, (page - 1) * _pageSize, _pageSize);
			var countTask = _flowersStore.CountPublishedAsync(filter);

			await Task.WhenAll(dataTask, countTask);

			if (dataTask.Result.Length == 0 && countTask.Result > 0)
			{
				page = countTask.Result / _pageSize + (countTask.Result % _pageSize > 0 ? 1 : 0);
				dataTask = _flowersStore.GetPublishedWithMainImageAsync(filter, (page - 1) * _pageSize, _pageSize);
				await dataTask;
			}
			else if (countTask.Result == 0)
			{
				page = 1;
			}

			return new PagedResult<Flower>
			{
				Items = dataTask.Result,
				TotalCount = countTask.Result,
				Page = page,
				PageSize = _pageSize
			};
		}
	}
}