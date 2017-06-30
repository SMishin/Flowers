﻿using System;
using System.Threading.Tasks;
using Flowers.Colors;

namespace Flowers.Products.Bouquets
{
	public class BouquetsManager : IBouquetsManager
	{
		private readonly IProductsManager _productsManager;
		private readonly IBouquetsStore _bouquetsStore;

		public BouquetsManager(IProductsManager productsManager, IBouquetsStore bouquetsStore)
		{
			_productsManager = productsManager;
			_bouquetsStore = bouquetsStore;
		}

		public async Task<PagedResult<Bouquet>> GetPublishedWithMainImageAsync(int page,
			TypesFilter<BouquetType> bouquetsTypesFilter = null,
			ColorFilter colorsFilter = null,
			PriceFilter priceFilter = null)
		{
			PagedResultsFactory factory = new PagedResultsFactory();

			var result = await factory.Create(
				(skip, take) => _bouquetsStore.GetPublishedWithMainImageAsync(skip, take, bouquetsTypesFilter, colorsFilter, priceFilter),
				() => _bouquetsStore.CountPublishedAsync(bouquetsTypesFilter, colorsFilter, priceFilter),
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

		public async Task RemoveAsync(int id)
		{
			await _bouquetsStore.RemoveAsync(id);
			await _productsManager.RemoveAsync(id);

		}

		public Task AddFlower(int id, int flowerId)
		{
			return _bouquetsStore.AddFlower(id, flowerId);
		}

		public Task<int[]> GetFlowers(int id)
		{
			return _bouquetsStore.GetFlowersIds(id);
		}

		public Task RemoveFlower(int id, int flowerId)
		{
			return _bouquetsStore.RemoveFlower(id, flowerId);
		}
	}
}