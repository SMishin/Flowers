using Flowers.Products.ProductTypes;

namespace Flowers.Products.Bouquets
{
	public class Bouquet : Product
	{
		public Bouquet()
		{
			base.Type = ProductType.Bouquets;
		}

		public BouquetType BouquetType { get; set; }

	}
}