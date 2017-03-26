using System;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Flowers.BL.Products;
using Flowers.Products.ProductType;

namespace Flowers.DAL.Products
{
	public class ProductsReadOnlyStore : IProductsReadOnlyStore
	{
		protected readonly SqlConnectionHelper SqlConnectionHelper;

		public ProductsReadOnlyStore()
		{
			SqlConnectionHelper = new SqlConnectionHelper();
		}
		protected ProductsReadOnlyStore(SqlConnectionHelper sqlConnectionHelper)
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

		public async Task<Product[]> GetPublishedWithMainImageAsync(ProductType productType, int skip, int take)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Product>("SelectPublishedProductsWithMainImage",
				new
				{
					ProductType = productType,
					Skip = skip,
					Take = take
				},
				commandType: System.Data.CommandType.StoredProcedure)).ToArray();
			}
		}


		public async Task<ProductImage[]> GetImagesAsync(int productId)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<ProductImage>("select * from dbo.[ProductImages] where ProductId = @Id", new { Id = productId })).ToArray();
			}
		}

		public async Task<ProductImage> GetImageAsync(int imageId)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<ProductImage>("select * from dbo.[ProductImages] where Id = @Id", new { Id = imageId })).FirstOrDefault();
			}
		}

		public async Task<int> CountPublishedAsync(ProductType productType)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<int>("select count(*) from dbo.[Products] where [Type] = @ProductType and [Published] = 1", new { ProductType = productType })).First();
			}
		}
	}
}