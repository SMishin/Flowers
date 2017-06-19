using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Flowers.Products.Flowers;

namespace Flowers.Data.Products.Flowers
{
	public class FlowersTypesReadOnlyStore : IFlowersTypesReadOnlyStore
	{
		protected readonly ISqlConnectionHelper SqlConnectionHelper;

		public FlowersTypesReadOnlyStore(ISqlConnectionHelper sqlConnectionHelper)
		{
			SqlConnectionHelper = sqlConnectionHelper;
		}

		public async Task<FlowerType[]> Get()
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<FlowerType>("SELECT * FROM [FlowersType]")).ToArray();
			}
		}
	}
}