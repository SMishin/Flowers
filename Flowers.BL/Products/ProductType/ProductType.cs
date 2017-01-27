using System.Collections.Generic;

namespace Flowers.BL.Products.ProductType
{
	public enum ProductType
	{
		Undefined = -1,
		Flowers = 0,
		Toys = 1
	}

	public static class ProductTypeExtensions
	{
		private static readonly Dictionary<ProductType, string> Values = new Dictionary<ProductType, string>
		{
			{ProductType.Flowers,"Цветы"},
			{ProductType.Toys,"Игрушки"},
			{ProductType.Undefined,"Undefined"}
		};
		public static string ToFriendlyString(this ProductType me)
		{
			return Values[me];
		}
	}
}
