namespace Flowers.Products.ProductTypes
{
	public static class ProductTypeHelper
	{
		public static global::Flowers.Products.ProductTypes.ProductType FromString(string value)
		{
			switch (value)
			{
				case "flowers":
					{
						return ProductType.Flowers;
					}
				case "toys":
					{
						return global::Flowers.Products.ProductTypes.ProductType.Toys;
					}
				default:
					{
						return global::Flowers.Products.ProductTypes.ProductType.Undefined;
					}
			}
		}
	}
}