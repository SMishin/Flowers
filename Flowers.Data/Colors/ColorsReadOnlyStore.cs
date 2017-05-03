using System.Linq;
using System.Threading.Tasks;
using Flowers.Colors;
using Dapper;

namespace Flowers.Data.Colors
{
	public class ColorsReadOnlyStore : IColorsReadOnlyStore
	{
		protected readonly ISqlConnectionHelper SqlConnectionHelper;

		public ColorsReadOnlyStore(ISqlConnectionHelper sqlConnectionHelper)
		{
			SqlConnectionHelper = sqlConnectionHelper;
		}

		public async Task<Color[]> GetAsync()
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Color>("GetColors", commandType: System.Data.CommandType.StoredProcedure)).ToArray();
			}
		}

		public async Task<Color> GetAsync(int id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Color>("GetColor", commandType: System.Data.CommandType.StoredProcedure)).SingleOrDefault();
			}
		}
	}

}
