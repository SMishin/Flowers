using Flowers.Products.Flowers;

namespace Flowers.CoreWeb.Models.Flowers
{
	public class FlowersIndexViewModel
	{
		public FlowersIndexViewModel()
		{
			Flowers = new PagedResult<Flower>();
			Filter = new FlowersFilter();
		}

		public PagedResult<Flower> Flowers { get; set; }
		public FlowersFilter Filter { get; set; }
	}
}