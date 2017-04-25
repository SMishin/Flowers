namespace Flowers.Products
{
	public class ProductImage
	{
		public int Id { get; set; }
		public int ProductId { get; set; }
		public string Url { get; set; }
		public bool IsMain { get; set; }
	}
}
