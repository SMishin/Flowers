using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Flowers.Colors;
using Flowers.Data.Colors;
using Flowers.Products;
using Flowers.Products.Flowers;

namespace Flowers.Data.Products.Flowers
{
	public class FlowersReadOnlyStore : IFlowersReadOnlyStore
	{
		protected readonly ISqlConnectionHelper SqlConnectionHelper;

		public FlowersReadOnlyStore(ISqlConnectionHelper sqlConnectionHelper)
		{
			SqlConnectionHelper = sqlConnectionHelper;
		}

		public async Task<Flower[]> GetAsync(ColorFilter colorsFilter = null)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Flower>("SelectFlowersWithMainImage",
				new
				{
					Types = new TypesFilter<FlowerType>().GetTypesFromFilter(),
					Colors = colorsFilter.ToDataTable(),
					Skip = 0,
					Take = int.MaxValue
				},
				commandType: CommandType.StoredProcedure)).ToArray();
			}
		}

		public async Task<Flower> GetAsync(int id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				var multy = await conntection.QueryMultipleAsync(
					@"
					exec GetFlower @Id = @Id 
					select * from [FlowerVariants] where FlowerId = @Id
					select ColorId from [ProductsColors] where ProductId = @Id
					",
					new { Id = id });

				var flower = multy.Read<Flower>().FirstOrDefault();

				if (flower != null)
				{
					flower.FlowerVariants = multy.Read<FlowerVariant>();
					flower.Colors = multy.Read<string>().ToArray();
				}

				return flower;
			}
		}

		public async Task<Flower[]> GetPublishedWithMainImageAsync(int skip, int take, 
			TypesFilter<FlowerType> flowersTypesFilter = null, 
			ColorFilter colorFilter = null, 
			PriceFilter priceFilter = null
			)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Flower>("SelectFlowersWithMainImage",
				new
				{
					Types = flowersTypesFilter.GetTypesFromFilter(),
					Colors = colorFilter.ToDataTable(),
					Published = true,
					MinPrice = priceFilter?.From,
					MaxPrice = priceFilter?.To,
					Skip = skip,
					Take = take
				},
				commandType: CommandType.StoredProcedure)).ToArray();
			}
		}

		public async Task<Flower[]> GetRandomPublishedWithMainImageAsync(int count)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Flower>("SelectRandomPublishedFlowersWithMainImage",
				new
				{
					Count = count
				},
				commandType: CommandType.StoredProcedure)).ToArray();
			}
		}

		public async Task<int> CountPublishedAsync(TypesFilter<FlowerType> flowersTypesFilter = null, 
			ColorFilter colorsFilter = null, 
			PriceFilter priceFilter = null)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<int>("GetFlowersCount", 
					new
					{
						Published = true,
						Colors = colorsFilter.ToDataTable(),
						Types = flowersTypesFilter.GetTypesFromFilter(),
						MinPrice = priceFilter?.From,
						MaxPrice = priceFilter?.To,
					}, commandType: CommandType.StoredProcedure))
					.First();
			}
		}
	}
}