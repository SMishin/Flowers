using System.Data;
using System.Threading.Tasks;
using Dapper;
using Flowers.BL.Products;

namespace Flowers.DAL.Products
{
	public class ProductStore : ProductReadOnlyStore, IProductStore
	{
		public ProductStore() : base(new SqlConnectionHelper())
		{
		}

		public async Task SaveAsync(Product product)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("SaveProduct", product, commandType: CommandType.StoredProcedure);
			}
		}
	}
}
