using Flowers.Products;
using Flowers.Products.ProductTypes;

namespace Flowers.CoreWeb.Models.Products
{
	public class ProdutcsIndexViewModel: ProductListModel<Product>
	{
		public ProductType ProductType { get; set; }
	}
}