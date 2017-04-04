﻿namespace Flowers.Products
{
    public class Product
    {
        public int Id { get; set; }
        public ProductType.ProductType Type { get; set; }
        public string TypeString => Type.ToString().ToLower();
        public string Name { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public bool Published { get; set; }

    }
}