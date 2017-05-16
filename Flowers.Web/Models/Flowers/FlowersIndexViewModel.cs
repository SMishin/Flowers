using Flowers.Products.Flowers;

namespace Flowers.Web.Models.Flowers
{
	public class FlowersIndexViewModel
	{
		public FlowersIndexViewModel()
		{
			Flowers = new PagedResult<Flower>();
		    Filter = new FlowersTypesFilter();
		}

		public PagedResult<Flower> Flowers { get; set; }
	    public FlowersTypesFilter Filter { get; set; }
	}
}