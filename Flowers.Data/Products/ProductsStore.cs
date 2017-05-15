using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Flowers.Products;

namespace Flowers.Data.Products
{
	public class ProductsStore : ProductsReadOnlyStore, IProductsStore
	{
		public ProductsStore(ISqlConnectionHelper sqlConnectionHelper) : base(sqlConnectionHelper)
		{
		}

		public async Task<int> SaveAsync(Product product)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				var result = await conntection.QueryAsync<int>("SaveProduct", new
				{
					product.Id,
					product.Name,
					product.Price,
					product.Summary,
					product.Type,
					product.Description,
					product.Published

				}, commandType: CommandType.StoredProcedure);

				return result.FirstOrDefault();
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

		public async Task SetmMainImageAsync(int productId, int imageId)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("SetMainImage", new { ProductId = productId, ImageId = imageId }, commandType: CommandType.StoredProcedure);
			}
		}

		public async Task RemoveImageAsync(int imageId)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("delete dbo.[ProductImages] where Id = @Id", new { id = imageId });
			}
		}

		public async Task RemoveImagesAsync(int productId)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("delete dbo.[ProductImages] where ProductId = @Id", new { id = productId });
			}
		}

		public async Task RemoveAsync(int id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("delete dbo.[Products] where Id = @Id", new { Id = id });
			}
		}

		public async Task SetColorsAsync(int productId, string[] colorIds)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("SetProductsColors", new { ProductId = productId, Colors = ProductColorsToDataTable(colorIds) }, commandType: CommandType.StoredProcedure);
			}
		}

		private DataTable ProductColorsToDataTable(string[] colorIds)
		{
			var table = new DataTable();
			table.Columns.Add("Value", typeof(string));

			if (colorIds == null)
			{
				return table;
			}

			foreach (var item in colorIds)
			{
				table.Rows.Add(item);
			}

			return table;
		}
	}
}
