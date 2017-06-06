using System.Collections.Generic;

namespace Flowers.Products.Flowers
{
    public enum FlowerType
    {
        Undefined = -1,
        Rose = 0,
        Chrysanthemum = 1,
        Alstroemeria = 2,
        Carnation = 3,
        Iris = 4,
        Gerbera = 6,
        Lily = 7,
        Sunflower = 8,
        Tulip = 9,
        Freesia = 10,
        Eustoma = 11,
        Peony = 12,
        Calla = 13
    }

    public static class ProductTypeExtensions
    {
        private static readonly Dictionary<FlowerType, string> Values = new Dictionary<FlowerType, string>
        {
            {FlowerType.Rose,"Розы"},
            {FlowerType.Chrysanthemum,"Хризантемы"},
            {FlowerType.Alstroemeria,"Альстромерия"},
            {FlowerType.Carnation,"Гвоздика"},
            {FlowerType.Iris,"Ирис"},
            {FlowerType.Gerbera,"Гербера"},
            {FlowerType.Lily,"Лилия"},
            {FlowerType.Sunflower,"Подсолнух"},
            {FlowerType.Tulip,"Тюльпан"},
            {FlowerType.Freesia,"Фрезия"},
            {FlowerType.Eustoma,"Эустома"},
            {FlowerType.Peony,"Пион"},
            {FlowerType.Calla,"Калла"},
            {FlowerType.Undefined,"Undefined"}
        };

        public static string ToFriendlyString(this FlowerType me)
        {
            return Values[me];
        }

    }
}