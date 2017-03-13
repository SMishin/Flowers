using System.Collections.Generic;

namespace Flowers.BL.Products
{
	public class Flower : Product
	{
		public Flower()
		{
			FlowerVariants = new List<FlowerVariant>();
		}
		public FlowerType FlowerType { get; set; }
		public List<FlowerVariant> FlowerVariants { get; set; }

	}
}