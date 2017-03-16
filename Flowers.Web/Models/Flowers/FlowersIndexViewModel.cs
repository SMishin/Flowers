using Flowers.BL.Products.Flowers;

namespace Flowers.Web.Models.Flowers
{
	public class FlowersIndexViewModel
	{
		public Flower[] Products { get; set; }
		public int Count { get; set; }
		public int Page { get; set; }
	}
}