﻿namespace Flowers.BL.Products
{
	public class Product
	{
		public int Id { get; set; }
		public ProductType Type { get; set; }
		public string Name { get; set; }
		public string Summary { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
	}
}
