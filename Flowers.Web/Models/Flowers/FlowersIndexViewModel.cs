using Flowers.BL.Products.Flowers;
using Flowers.Products.Flowers;

namespace Flowers.Web.Models.Flowers
{
	public class FlowersIndexViewModel
	{
		public FlowersIndexViewModel()
		{
			Flowers = new Flower[0];
			Paging = new PagingModel();
		}
		public Flower[] Flowers { get; set; }
		public PagingModel Paging { get; set; }
	}
}