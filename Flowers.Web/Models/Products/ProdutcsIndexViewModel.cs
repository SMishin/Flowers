using Flowers.BL.Products;

namespace Flowers.Web.Models.Products
{
	public class ProdutcsIndexViewModel
	{
		public Product[] Products { get; set; }
		public int Count { get; set; }
		public int Page { get; set; }
	}
}