﻿using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Flowers.Colors;
using Flowers.Data.Colors;
using Flowers.Products;
using Flowers.Products.Bouquets;

namespace Flowers.Data.Products.Bouquets
{
	public class BouquetsReadOnlyStore : IBouquetsReadOnlyStore
	{
		protected readonly ISqlConnectionHelper SqlConnectionHelper;

		public BouquetsReadOnlyStore(ISqlConnectionHelper sqlConnectionHelper)
		{
			SqlConnectionHelper = sqlConnectionHelper;
		}

		public async Task<Bouquet[]> GetPublishedWithMainImageAsync(int skip, int take, 
			TypesFilter<BouquetType> bouquetTypeFilter = null, 
			ColorFilter colorsFilter = null, 
			PriceFilter priceFilter = null)
		{

			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Bouquet>("SelectBouquetsWithMainImage",
				new
				{
					Published = true,
					Types = bouquetTypeFilter.GetTypesFromFilter(),
					Colors = colorsFilter.ToDataTable(),
					MinPrice = priceFilter?.From,
					MaxPrice = priceFilter?.To,
					Skip = skip,
					Take = take
				},
				commandType: CommandType.StoredProcedure)).ToArray();
			}

		}

		public async Task<int> CountPublishedAsync(TypesFilter<BouquetType> bouquetTypeFilter = null, ColorFilter colorsFilter = null, PriceFilter priceFilter = null)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<int>("GetBouquetsCount",
					new
					{
						Published = true,
						Colors = colorsFilter.ToDataTable(),
						Types = bouquetTypeFilter.GetTypesFromFilter(),
						MinPrice = priceFilter?.From,
						MaxPrice = priceFilter?.To,
					}, commandType: CommandType.StoredProcedure))
					.First();
			}
		}

		public async Task<Bouquet[]> GetAsync(ColorFilter colorsFilter = null)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Bouquet>("SelectBouquetsWithMainImage",
				new
				{
					Types = new TypesFilter<BouquetType>().GetTypesFromFilter(),
					Colors = colorsFilter.ToDataTable(),
					Skip = 0,
					Take = int.MaxValue
				},
				commandType: CommandType.StoredProcedure)).ToArray();
			}
		}

		public async Task<Bouquet> GetAsync(int id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				var multy = await conntection.QueryMultipleAsync(@"
					exec GetBouquet  @Id = @Id 
					select ColorId from [ProductsColors] where ProductId = @Id",
					new { Id = id });

				var bouquet = multy.Read<Bouquet>().FirstOrDefault();

				if (bouquet != null)
				{
					bouquet.Colors = multy.Read<string>().ToArray();
				}

				return bouquet;
			}
		}
	}
}