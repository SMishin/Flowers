using Flowers.BL.Products.Flowers;

namespace Flowers.Web.Models.Flowers
{
	public class FlowersIndexViewModel
	{
		public FlowersIndexViewModel()
		{
			Flowes = new Flower[0];
			Paging = new PagingModel();
		}
		public Flower[] Flowes { get; set; }
		public PagingModel Paging { get; set; }
	}
}