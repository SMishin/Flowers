using System;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Flowers.BL.Products;

namespace Flowers.DAL.Products
{
	public class ProductReadOnlyStore : IProductReadOnlyStore
	{
		protected readonly SqlConnectionHelper SqlConnectionHelper;

		public ProductReadOnlyStore()
		{
			SqlConnectionHelper = new SqlConnectionHelper();
		}
		protected ProductReadOnlyStore(SqlConnectionHelper sqlConnectionHelper)
		{
			SqlConnectionHelper = sqlConnectionHelper;
		}

		public async Task<Product[]> GetAsync()
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Product>("select * from dbo.[Products]")).ToArray();
			}
		}

		public async Task<Product> GetAsync(int id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Product>("select * from dbo.[Products] where Id = @Id", new { Id = id })).FirstOrDefault();
			}
		}

		public async Task<Product[]> GetWithMainImageAsync(ProductType productType)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Product>("SelectProductsWithMainImage",
				new
				{
					ProductType = productType
				},
				commandType: System.Data.CommandType.StoredProcedure)).ToArray();
			}
		}


		public async Task<ProductImage[]> GetImagesAsync(int id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<ProductImage>("select * from dbo.[ProductImages] where ProductId = @Id", new { Id = id })).ToArray();
			}
		}
	}
}