﻿using System;
using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public interface IProductsManager
	{
		Task<int> SaveAsync(Product product);
		Task RemoveAsync(int id);
		Task<ProductImage> UploadImage(byte[] content, string contentType, int productId);
		Task SetMainImageAsync(int productId, int imageId);
		Task RemoveImageAsync(int imageId);
	}
}