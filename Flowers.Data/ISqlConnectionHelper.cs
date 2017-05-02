using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Flowers.Data
{
	public interface ISqlConnectionHelper
	{
		Task<SqlConnection> CreateConnection();
	}
}