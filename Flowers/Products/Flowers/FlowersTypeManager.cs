using System.Threading.Tasks;

namespace Flowers.Products.Flowers
{
	public class FlowersTypeManager : IFlowersTypeManager
	{
		private readonly IFlowersTypesStore _flowersTypesStore;

		public FlowersTypeManager(IFlowersTypesStore flowersTypesStore)
		{
			_flowersTypesStore = flowersTypesStore;
		}

		public async Task<int> SaveAsync(FlowerType flowerType)
		{
			var id =  await _flowersTypesStore.SaveAsync(flowerType);

			if (id == 0)
			{
				id = flowerType.Id;
			}

			return id;
		}

		public Task RemoveAsync(int id)
		{
			return _flowersTypesStore.RemoveAsync(id);
		}
	}
}