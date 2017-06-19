using Flowers.Products;
using Flowers.Products.Flowers;

namespace Flowers.CoreWeb.Models.Flowers
{
	public class FlowersIndexViewModel: ProductListModel<Flower>
	{
		public FlowersIndexViewModel()
		{
			FlowersTypesFilter = new TypesFilter<FlowersTypes>();
		}
	
		public TypesFilter<FlowersTypes> FlowersTypesFilter { get; set; }
	}
}