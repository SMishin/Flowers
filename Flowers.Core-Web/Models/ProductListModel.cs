using Flowers.Colors;

namespace Flowers.CoreWeb.Models
{
	public class ProductListModel<T> where T : new()
	{
		public ProductListModel()
		{
			Data = new PagedResult<T>();
			
			ColorsFilterModel = new ColorsFilterModel();
		}

		public PagedResult<T> Data { get; set; }
		public ColorsFilterModel ColorsFilterModel { get; set; }
	}
}