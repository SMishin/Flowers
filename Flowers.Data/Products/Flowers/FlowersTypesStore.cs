using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Flowers.Products.Flowers;

namespace Flowers.Data.Products.Flowers
{
	public class FlowersTypesStore : FlowersTypesReadOnlyStore, IFlowersTypesStore
	{
		public FlowersTypesStore(ISqlConnectionHelper sqlConnectionHelper) : base(sqlConnectionHelper)
		{
		}

		public async Task<int> SaveAsync(FlowerType flowerType)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<int>("SaveFlowerType", new
				{
					flowerType.Id,
					flowerType.Name

				}, commandType: CommandType.StoredProcedure)).FirstOrDefault();

			}
		}

		public async Task RemoveAsync(int id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("delete dbo.[FlowersType] where Id = @Id", new { Id = id });
			}
		}
	}
}