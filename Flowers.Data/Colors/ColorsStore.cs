using System.Threading.Tasks;
using Flowers.Colors;

namespace Flowers.Data.Colors
{
	public class ColorsStore : ColorsReadOnlyStore, IColorsStore
	{

		public ColorsStore(ISqlConnectionHelper sqlConnectionHelper) : base(sqlConnectionHelper)
		{

		}

		public Task<int> SaveAsync(Color product)
		{
		}

		public Task RemoveAsync(int id)
		{
		}
	}
}