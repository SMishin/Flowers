using Flowers.Products;

namespace Flowers.CoreWeb.Models
{
	public class ProductListModel<T> where T : new()
	{
		public ProductListModel()
		{
			Data = new PagedResult<T>();
			
			ColorsFilterModel = new ColorsFilterModel();
			PriceFilter = new PriceFilter();
		}

		public PagedResult<T> Data { get; set; }
		public ColorsFilterModel ColorsFilterModel { get; set; }
		public PriceFilter PriceFilter{ get; set; }
	}
}