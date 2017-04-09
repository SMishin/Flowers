using System.Collections.Generic;

namespace Flowers.Products.Flowers
{
    public enum FlowerType
    {
        Undefined = -1,
        Rose = 0,
        Chrysanthemum = 1
    }

    public static class ProductTypeExtensions
    {
        private static readonly Dictionary<FlowerType, string> Values = new Dictionary<FlowerType, string>
        {
            {FlowerType.Rose,"Розы"},
            {FlowerType.Chrysanthemum,"Хризантемы"},
            {FlowerType.Undefined,"Undefined"}
        };

        public static string ToFriendlyString(this FlowerType me)
        {
            return Values[me];
        }

    }
}