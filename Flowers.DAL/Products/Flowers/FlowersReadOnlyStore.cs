using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Flowers.BL.Products;
using Flowers.BL.Products.Flowers;

namespace Flowers.DAL.Products.Flowers
{
	public class FlowersReadOnlyStore : IFlowersReadOnlyStore
	{
		protected readonly SqlConnectionHelper SqlConnectionHelper;

		public FlowersReadOnlyStore()
		{
			SqlConnectionHelper = new SqlConnectionHelper();
		}
		protected FlowersReadOnlyStore(SqlConnectionHelper sqlConnectionHelper)
		{
			SqlConnectionHelper = sqlConnectionHelper;
		}

		public async Task<Flower[]> GetAsync()
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Flower>("select * from dbo.[Flowers]")).ToArray();
			}
		}

		public async Task<Flower> GetAsync(int id)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				var multy  = await conntection.QueryMultipleAsync(
					@"
					exec GetFlower @Id = @Id 
					select * from [FlowerVariants] where FlowerId = @Id
					",
					new { Id = id });

				var flower = multy.Read<Flower>().FirstOrDefault();

				if (flower != null)
				{
					flower.FlowerVariants = multy.Read<FlowerVariant>();
				}

				return flower; 
			}
		}

		public async Task<Flower[]> GetPublishedWithMainImageAsync(int skip, int take)
		{
			using (var conntection = await SqlConnectionHelper.CreateConnection())
			{
				return (await conntection.QueryAsync<Flower>("SelectPublishedFlowersWithMainImage",
				new
				{
					Skip = skip,
					Take = take
				},
				commandType: System.Data.CommandType.StoredProcedure)).ToArray();
			}
		}
	}
}