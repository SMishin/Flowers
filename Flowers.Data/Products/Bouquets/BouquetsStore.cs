using System.Data;
using System.Threading.Tasks;
using Dapper;
using Flowers.Products.Bouquets;

namespace Flowers.Data.Products.Bouquets
{
	public class BouquetsStore : BouquetsReadOnlyStore, IBouquetsStore
	{
		public BouquetsStore(ISqlConnectionHelper sqlConnectionHelper) : base(sqlConnectionHelper)
		{

		}

		public async Task SaveAsync(Bouquet product)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("SaveBouquet", new
				{
					product.Id,
					Type = product.BouquetType

				}, commandType: CommandType.StoredProcedure);

			}
		}

		public async Task RemoveAsync(int id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync(@"delete [dbo].[Bouquets] where Id = @Id", new { Id = id });
			}
		}
	}
}
