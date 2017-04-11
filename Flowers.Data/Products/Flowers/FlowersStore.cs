using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Flowers.BL.Products;
using Flowers.DAL;
using Flowers.Products.Flowers;

namespace Flowers.Data.Products.Flowers
{
	public class FlowersStore : FlowersReadOnlyStore, IFlowersStore
	{
		private readonly IProductsStore _productsStore;

		public FlowersStore(IProductsStore productsStore) : base(new SqlConnectionHelper())
		{
			_productsStore = productsStore;
		}

		public async Task<int> SaveAsync(Flower flower)
		{
			int id = await _productsStore.SaveAsync(flower);

			if (id == 0)
			{
				id = flower.Id;
			}

			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("SaveFlower", new
				{
					Id = id,
					Type = flower.FlowerType

				}, commandType: CommandType.StoredProcedure);

				await conntection.ExecuteAsync("SaveFlowerVariants", new
				{
					FlowerId = id,
					FlowerPrices = FlowerVariantsToDataTable(flower.FlowerVariants)

				}, commandType: CommandType.StoredProcedure);

				return id;
			}
		}

		public async Task RemoveAsync(int id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync(@"
						delete [dbo].[FlowerVariants] where FlowerId = @Id
						delete [dbo].[Flowers] where Id = @Id
					", 
					new { Id = id });
			}
		}

		private DataTable FlowerVariantsToDataTable(IEnumerable<FlowerVariant> flowerVariants)
		{
			var table = new DataTable();
			table.Columns.Add("Size", typeof(int));
			table.Columns.Add("Price", typeof(decimal));

			foreach (var item in flowerVariants)
			{
				table.Rows.Add(item.Size, item.Price);
			}

			return table;
		}
	}
}
