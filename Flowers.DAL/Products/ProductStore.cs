using System.Data;
using System.Linq;
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
				await conntection.ExecuteAsync("SaveProduct", new
				{
					product.Id,
					product.Name,
					product.Price,
					product.Summary,
					product.Type,
					product.Description

				}, commandType: CommandType.StoredProcedure);
			}
		}

		public async Task<int> AddImageAsync(int id, string imgUrl)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				int imgId = (await conntection.QueryAsync<int>("SaveProductImage", new { ProductId = id, Url = imgUrl }, commandType: CommandType.StoredProcedure))
					?.FirstOrDefault() ?? -1;
				return imgId;
			}
		}

		public async Task RemoveImageAsync(int id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("delete dbo.[ProductImages] where Id = @Id", new { id });
			}
		}
	}
}
