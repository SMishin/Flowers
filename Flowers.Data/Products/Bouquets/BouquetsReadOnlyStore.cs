using System.Data;
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

		public async Task<Bouquet[]> GetPublishedWithMainImageAsync(int skip, int take, TypesFilter<BouquetType> bouquetTypeFilter = null, ColorFilter colorsFilter = null)
		{

			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Bouquet>("SelectPublishedBouquetsWithMainImage",
				new
				{
					Types = bouquetTypeFilter.GetTypesFromFilter(),
					Colors = colorsFilter.ToDataTable(),
					Skip = skip,
					Take = take
				},
				commandType: CommandType.StoredProcedure)).ToArray();
			}

		}

		public async Task<int> CountPublishedAsync(TypesFilter<BouquetType> bouquetTypeFilter = null, ColorFilter colorsFilter = null)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<int>("GetBouquetsCount",
					new
					{
						Published = true,
						Colors = colorsFilter.ToDataTable(),
						Types = bouquetTypeFilter.GetTypesFromFilter()
					}, commandType: CommandType.StoredProcedure))
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