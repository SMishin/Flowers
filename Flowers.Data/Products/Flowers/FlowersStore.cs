using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Flowers.Products.Flowers;

namespace Flowers.Data.Products.Flowers
{
	public class FlowersStore : FlowersReadOnlyStore, IFlowersStore
	{

		public FlowersStore(ISqlConnectionHelper sqlConnectionHelper) : base(sqlConnectionHelper)
		{

		}

		public async Task SaveAsync(Flower flower)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync("SaveFlower", new
				{
					flower.Id,
					Type = flower.FlowerType

				}, commandType: CommandType.StoredProcedure);

				await conntection.ExecuteAsync("SaveFlowerVariants", new
				{
					FlowerId = flower.Id,
					FlowerPrices = FlowerVariantsToDataTable(flower.FlowerVariants)

				}, commandType: CommandType.StoredProcedure);

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
