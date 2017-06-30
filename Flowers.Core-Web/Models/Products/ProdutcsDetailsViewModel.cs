using Flowers.Products;
using Flowers.Products.Flowers;

namespace Flowers.CoreWeb.Models.Products
{
	public class ProdutcsDetailsViewModel
	{
		public Product Product { get; set; }
		public ProductImage[] ProductImages { get; set; }
		public Product[] OtherProducts{ get; set; }
		public Flower[] Flowers { get; set; }
	}
}