using Flowers.Products;
using Flowers.Products.ProductTypes;

namespace Flowers.CoreWeb.Models.Products
{
	public class ProdutcsIndexViewModel: ProductListMode<Product>
	{
		public ProductType ProductType { get; set; }
	}
}