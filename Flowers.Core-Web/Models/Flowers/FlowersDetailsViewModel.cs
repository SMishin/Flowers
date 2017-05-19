using Flowers.Products;
using Flowers.Products.Flowers;

namespace Flowers.CoreWeb.Models.Flowers
{
	public class FlowersDetailsViewModel
	{
		public Flower Flower { get; set; }
		public ProductImage[] ProductImages { get; set; }
		public Flower[] OtherProducts{ get; set; }
	}
}