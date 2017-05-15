using Flowers.Products;
using Flowers.Products.ProductTypes;

namespace Flowers.CoreWeb.Models.Products
{
	public class ProdutcsIndexViewModel
	{
		public PagedResult<Product> Products { get; set; }
		public ProductType ProductType { get; set; }
	}
}