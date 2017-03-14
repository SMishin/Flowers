using System.Threading.Tasks;

namespace Flowers.BL.Products.Flowers
{
	public class FlowersManager : IFlowersManager
	{
		private readonly IFlowersStore _flowersStore;

		public FlowersManager(IFlowersStore flowersStore)
		{
			_flowersStore = flowersStore;
		}
		public Task<int> SaveAsync(Flower flower)
		{
			return _flowersStore.SaveAsync(flower);
		}
	}
}