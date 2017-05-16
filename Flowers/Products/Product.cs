using Flowers.Products.ProductTypes;

namespace Flowers.Products
{
	public class Product
	{
		public Product()
		{
			Colors = new string[0];
		}
		public int Id { get; set; }
		public ProductType Type { get; set; }
		public string TypeString => Type.ToString().ToLower();
		public string Name { get; set; }
		public string Summary { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public string ImageUrl { get; set; }
		public bool Published { get; set; }
		public string[] Colors { get; set; }

		public virtual string FormatedPrice => Price.ToString("C");

	}
}
