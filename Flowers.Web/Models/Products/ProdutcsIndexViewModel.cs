using Flowers.Products;
using Flowers.Products.ProductTypes;

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