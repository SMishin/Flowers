using System.Collections.Generic;

namespace Flowers.Products.Bouquets
{
	public enum BouquetType
	{
		Undefined = -1,
		Classic = 0,
		Designer = 1,
		Box = 2,
		Basket = 3,
		Toy = 4

	}
	public static class BouquetTypeExtensions
	{
		private static readonly Dictionary<BouquetType, string> Values = new Dictionary<BouquetType, string>
		{
			{BouquetType.Classic,"Классика"},
			{BouquetType.Designer,"Авторские"},
			{BouquetType.Box,"Коробки"},
			{BouquetType.Basket,"Корзины"},
			{BouquetType.Toy,"Игрушки"},
		};

		public static string ToFriendlyString(this BouquetType me)
		{
			return Values[me];
		}

	}
}