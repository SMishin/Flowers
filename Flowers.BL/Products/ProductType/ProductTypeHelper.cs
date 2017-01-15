namespace Flowers.BL.Products.ProductType
{
	public static class ProductTypeHelper
	{
		public static ProductType FromString(string value)
		{
			switch (value)
			{
				case "flowers":
					{
						return ProductType.Flowers;
					}
				case "toys":
					{
						return ProductType.Toys;
					}
				default:
					{
						return ProductType.Undefined;
					}
			}
		}
	}
}