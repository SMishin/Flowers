using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Flowers.Data
{
    public class SqlConnectionHelper : ISqlConnectionHelper
	{
	    private readonly string _connectionString;

	    public SqlConnectionHelper(string connectionString)
	    {
	        _connectionString = connectionString;
	    }

        public async Task<SqlConnection> CreateConnection()
        {
	        var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            return connection;
        }
    }
}