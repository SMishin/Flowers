using Flowers.Products.Flowers;

namespace Flowers.CoreWeb.Models.Flowers
{
	public class FlowersIndexViewModel: ProductListMode<Flower>
	{
		public FlowersIndexViewModel()
		{
			Filter = new FlowersFilter();
		}
	
		public FlowersFilter Filter { get; set; }
	}
}