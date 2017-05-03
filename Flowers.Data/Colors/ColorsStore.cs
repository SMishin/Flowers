using System.Threading.Tasks;
using Dapper;
using Flowers.Colors;

namespace Flowers.Data.Colors
{
	public class ColorsStore : ColorsReadOnlyStore, IColorsStore
	{

		public ColorsStore(ISqlConnectionHelper sqlConnectionHelper) : base(sqlConnectionHelper)
		{

		}

		public async Task SaveAsync(Color product)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("SaveColor", product, commandType: System.Data.CommandType.StoredProcedure);
			}
		}

		public async Task RemoveAsync(string id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("RemoveColor", new { Id = id }, commandType: System.Data.CommandType.StoredProcedure);
			}
		}
	}
}