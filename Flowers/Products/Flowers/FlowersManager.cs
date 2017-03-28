using System.Threading.Tasks;

namespace Flowers.Products.Flowers
{
    public class FlowersManager : IFlowersManager
    {
        private readonly IProductsManager _productsManager;
        private readonly IFlowersStore _flowersStore;
        private readonly IProductsReadOnlyStore _productsReadOnlyStore;

        private int _pageSize = 6;

        public FlowersManager(IProductsManager productsManager, IFlowersStore flowersStore, IProductsReadOnlyStore productsReadOnlyStore)
        {
            _productsManager = productsManager;
            _flowersStore = flowersStore;
            _productsReadOnlyStore = productsReadOnlyStore;
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

        public async Task<PagedResult<Flower>> GetPublishedWithMainImageAsync(int page = 1)
        {
            var dataTask = _flowersStore.GetPublishedWithMainImageAsync((page - 1) * _pageSize, _pageSize);
            var countTask = _productsReadOnlyStore.CountPublishedAsync(ProductType.ProductType.Flowers);

            await Task.WhenAll(dataTask, countTask);

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