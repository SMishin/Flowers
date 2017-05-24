using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
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

		public async Task<Bouquet[]> GetPublishedWithMainImageAsync(TypesFilter<BouquetType> filter, int skip, int take)
		{
			DataTable bouquetTypes = filter.GetTypesFromFilter();

			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Bouquet>("SelectPublishedBouquetsWithMainImage",
				new
				{
					Types = bouquetTypes,
					Skip = skip,
					Take = take
				},
				commandType: CommandType.StoredProcedure)).ToArray();
			}
		}

		public async Task<int> CountPublishedAsync(TypesFilter<BouquetType> filter)
		{
			BouquetType[] bouquetTypes = filter.Types;

			string query = @" select 
                        count(*) from dbo.[Bouquets] b
                    join dbo.[Products] p on b.Id = p.Id
                    where p.[Published] = 1";

			if (bouquetTypes != null && bouquetTypes.Length > 0)
			{
				query += " and b.[Type] in @Types";
			}

			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<int>(query, new { Types = bouquetTypes }))
					.First();
			}
		}

		public Task<Bouquet[]> GetAsync()
		{
			throw new System.NotImplementedException();
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