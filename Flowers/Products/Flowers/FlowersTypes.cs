using System.Collections.Generic;

namespace Flowers.Products.Flowers
{
    public enum FlowersTypes
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
        private static readonly Dictionary<FlowersTypes, string> Values = new Dictionary<FlowersTypes, string>
        {
            {FlowersTypes.Rose,"Розы"},
            {FlowersTypes.Chrysanthemum,"Хризантемы"},
            {FlowersTypes.Alstroemeria,"Альстромерия"},
            {FlowersTypes.Carnation,"Гвоздика"},
            {FlowersTypes.Iris,"Ирис"},
            {FlowersTypes.Gerbera,"Гербера"},
            {FlowersTypes.Lily,"Лилия"},
            {FlowersTypes.Sunflower,"Подсолнух"},
            {FlowersTypes.Tulip,"Тюльпан"},
            {FlowersTypes.Freesia,"Фрезия"},
            {FlowersTypes.Eustoma,"Эустома"},
            {FlowersTypes.Peony,"Пион"},
            {FlowersTypes.Calla,"Калла"},
            {FlowersTypes.Undefined,"Undefined"}
        };

        public static string ToFriendlyString(this FlowersTypes me)
        {
            return Values[me];
        }

    }
}