using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
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

		public async Task<Flower[]> GetAsync()
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Flower>("SelectFlowersWithMainImage", commandType: System.Data.CommandType.StoredProcedure)).ToArray();
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

		public async Task<Flower[]> GetPublishedWithMainImageAsync(TypesFilter<FlowerType> filters, int skip, int take)
		{
			DataTable flowerTypess = GetflowerTypesFromFilter(filters);

			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Flower>("SelectPublishedFlowersWithMainImage",
				new
				{
					Types = flowerTypess,
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

		public async Task<int> CountPublishedAsync(TypesFilter<FlowerType> filter)
		{
			FlowerType[] flowerTypess = filter.Types; //(filter?.Types ?? Enum.GetValues(typeof(FlowerType)).Cast<FlowerType>()).ToArray();

			string query = @" select 
                        count(*) from dbo.[Flowers] f
                    join dbo.[Products] p on f.Id = p.Id
                    where p.[Published] = 1";

			if (flowerTypess != null && flowerTypess.Length > 0)
			{
				query += " and f.[Type] in @Types";
			}

			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<int>(query, new { Types = flowerTypess }))
					.First();
			}
		}

		private DataTable GetflowerTypesFromFilter(TypesFilter<FlowerType> filters)
		{
			DataTable flowerTypes;

			if (filters?.Types == null || filters.Types.Length == 0)
			{
				flowerTypes = filters.GetTypesFromFilter();
				
			}
			else
			{
				flowerTypes = filters.Types.TypesToDataTable();
			}

			return flowerTypes;
		}
	}
}