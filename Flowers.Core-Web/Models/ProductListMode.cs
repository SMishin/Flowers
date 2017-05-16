namespace Flowers.CoreWeb.Models
{
	public class ProductListMode<T> where T:new()
	{
		public ProductListMode()
		{
			Data = new PagedResult<T>();
		}
		public PagedResult<T> Data { get; set; }
	}
}