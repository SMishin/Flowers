using System;
using System.Threading.Tasks;

namespace Flowers.Products.Bouquets
{
	public class BouquetsManager :  IBouquetsManager
	{
		private readonly IProductsManager _productsManager;
		private readonly IBouquetsStore _bouquetsStore;

		public BouquetsManager(IProductsManager productsManager,  IBouquetsStore bouquetsStore)
		{
			_productsManager = productsManager;
			_bouquetsStore = bouquetsStore;
		}

		public async Task<PagedResult<Bouquet>> GetPublishedWithMainImageAsync(TypesFilter<BouquetType> filter, int page = 1)
		{
			PagedResultsFactory factory = new PagedResultsFactory();

			var result = await factory.Create(
				(skip, take) => _bouquetsStore.GetPublishedWithMainImageAsync(filter, skip, take),
				() => _bouquetsStore.CountPublishedAsync(filter),
				page);

			return result;
		}

		public async Task<int> SaveAsync(Bouquet bouquet)
		{
			bouquet.Type = ProductTypes.ProductType.Bouquets;

			var id = await _productsManager.SaveAsync(bouquet);

			if (id == 0)
			{
				id = bouquet.Id;
			}
			else
			{
				bouquet.Id = id;
			}

			await Task.WhenAll(_bouquetsStore.SaveAsync(bouquet), _productsManager.SetColorsAsync(id, bouquet.Colors));
			return id;
		}

		public Task RemoveAsync(int id)
		{
			return _bouquetsStore.RemoveAsync(id);
		}

		
	}
}