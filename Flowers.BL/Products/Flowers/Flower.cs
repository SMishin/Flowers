using System.Collections.Generic;

namespace Flowers.BL.Products.Flowers
{
	public class Flower : Product
	{
		public Flower()
		{
			base.Type = ProductType.ProductType.Flowers;
			FlowerVariants = new List<FlowerVariant>();
		}
		public FlowerType FlowerType { get; set; }
		public decimal MinPrice { get; set; }
		public decimal MaxPrice { get; set; }
		public IEnumerable<FlowerVariant> FlowerVariants { get; set; }

	}
}