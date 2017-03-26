using Flowers.BL.Products;
using Flowers.Products.ProductType;

namespace Flowers.Web.Models.Products
{
	public class ProdutcsIndexViewModel
	{
		public Product[] Products { get; set; }
		public int Count { get; set; }
		public int Page { get; set; }

		public ProductType ProductType { get; set; }
	}
}