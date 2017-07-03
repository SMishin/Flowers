using System.Threading.Tasks;
using Dapper;
using Flowers.Products.ProductComposition;

namespace Flowers.Data.Products.ProductComposition
{
	public class ProductCompositionStore : ProductCompositionReadOnlyStore, IProductCompositionStore
	{
		public ProductCompositionStore(ISqlConnectionHelper sqlConnectionHelper) : base(sqlConnectionHelper)
		{
		}
		
		public async Task Add(int mainProductId, int productId, int count = 1)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				await conntection.ExecuteAsync(@"
					if(not exists (select null from [dbo].[BouquetsFlowers] where [BouquetId] = @Id and [FlowerId] = @FlowerId))
					insert into [dbo].[BouquetsFlowers] values (@Id, @FlowerId)");
			}
		}

	}
}