using System.Collections.Generic;
using Flowers.BL.Products;
using Flowers.BL.Products.Flowers;

namespace Flowers.Products.Flowers
{
    public class Flower : Product
    {
        public Flower()
        {
            base.Type = ProductType.ProductType.Flowers;
            FlowerVariants = new List<FlowerVariant>();
        }
        public FlowerType FlowerType { get; set; }
        public decimal MinPrice { get; set; }
        public decimal MaxPrice { get; set; }

        public string FormatedPrice => MinPrice > 0 ? $"{(MaxPrice > 0 ? "от " : "")}{MinPrice:C}" : "";

        public IEnumerable<FlowerVariant> FlowerVariants { get; set; }

    }
}