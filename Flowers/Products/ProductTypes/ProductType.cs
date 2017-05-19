using System.Collections.Generic;

namespace Flowers.Products.ProductTypes
{
	public enum ProductType
	{
		Undefined = -1,
		Flowers = 0,
		Bouquets = 1,
		Toys = 2
	}

	public static class ProductTypeExtensions
	{
		private static readonly Dictionary<ProductType, string> values = new Dictionary<ProductType, string>
		{
			{ProductType.Flowers,"Цветы"},
			{ProductType.Bouquets,"Букеты"},
			{ProductType.Toys,"Игрушки"},
			{ProductType.Undefined,"Undefined"}
		};

		public static string ToFriendlyString(this ProductType me)
		{
			return values[me];
		}
	}
}
