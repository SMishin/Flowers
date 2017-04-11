using Flowers.BL.Products;
using Flowers.Products.Flowers;

namespace Flowers.Web.Models.Flowers
{
	public class FlowersDetailsViewModel
	{
		public Flower Product { get; set; }
		public ProductImage[] ProductImages { get; set; }
		public Flower[] OtherProducts{ get; set; }
	}
}