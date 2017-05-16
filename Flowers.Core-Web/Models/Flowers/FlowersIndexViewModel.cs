using Flowers.Products.Flowers;

namespace Flowers.CoreWeb.Models.Flowers
{
	public class FlowersIndexViewModel: ProductListMode<Flower>
	{
		public FlowersIndexViewModel()
		{
			Filter = new FlowersTypesFilter();
		}
	
		public FlowersTypesFilter Filter { get; set; }
	}
}