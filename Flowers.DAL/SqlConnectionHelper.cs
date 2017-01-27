using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Flowers.DAL
{
    public class SqlConnectionHelper
    {
        public async Task<SqlConnection> CreateConnection()
        {
            ConnectionStringSettings mySetting = ConfigurationManager.ConnectionStrings["Flowers.DB"];

			if (string.IsNullOrEmpty(mySetting?.ConnectionString))
	        {
		        throw new Exception("Fatal error: missing connecting string in web.config file");
	        }

	        var connection = new SqlConnection(mySetting.ConnectionString);
            await connection.OpenAsync();
            return connection;
        }
    }
}