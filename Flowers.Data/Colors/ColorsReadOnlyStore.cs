using System.Threading.Tasks;
using Flowers.Colors;

namespace Flowers.Data.Colors
{
	public class ColorsReadOnlyStore : IColorsReadOnlyStore
	{
		protected readonly ISqlConnectionHelper SqlConnectionHelper;

		protected ColorsReadOnlyStore(ISqlConnectionHelper sqlConnectionHelper)
		{
			SqlConnectionHelper = sqlConnectionHelper;
		}

		public Task<Color[]> GetAsync()
		{
			throw new System.NotImplementedException();
		}

		public Task<Color> GetAsync(int id)
		{
			throw new System.NotImplementedException();
		}
	}
}