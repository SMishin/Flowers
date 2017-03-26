namespace Flowers.Products.ProductType
{
	public static class ProductTypeHelper
	{
		public static global::Flowers.Products.ProductType.ProductType FromString(string value)
		{
			switch (value)
			{
				case "flowers":
					{
						return ProductType.Flowers;
					}
				case "toys":
					{
						return global::Flowers.Products.ProductType.ProductType.Toys;
					}
				default:
					{
						return global::Flowers.Products.ProductType.ProductType.Undefined;
					}
			}
		}
	}
}