using Flowers.Products;

namespace Flowers.CoreWeb.Models.Products
{
	public class ProdutcsDetailsViewModel
	{
		public Product Product { get; set; }
		public ProductImage[] ProductImages { get; set; }
		public Product[] OtherProducts{ get; set; }
	}
}