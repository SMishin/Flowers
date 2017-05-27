using Flowers.Products;
using Flowers.Products.Flowers;

namespace Flowers.CoreWeb.Models.Flowers
{
	public class FlowersIndexViewModel: ProductListMode<Flower>
	{
		public FlowersIndexViewModel()
		{
			FlowersTypesFilter = new TypesFilter<FlowerType>();
		}
	
		public TypesFilter<FlowerType> FlowersTypesFilter { get; set; }
	}
}