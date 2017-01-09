using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public class ProductManager : IProductManager
	{
		private readonly IProductStore _productStore;
		private readonly string _imagesRootPath;

		private readonly Dictionary<string, string> _extensionLookup = new Dictionary<string, string>
		{
			{"image/jpeg", ".jpg"},
		};

		public ProductManager(IProductStore productStore, string imagesRootPath)
		{
			_productStore = productStore;
			_imagesRootPath = imagesRootPath;
		}
		public Task SaveAsync(Product product)
		{
			return _productStore.SaveAsync(product);
		}

		public async Task<string> UploadImage(byte[] content, string contentType, int? id)
		{
			if (!Directory.Exists(_imagesRootPath))
			{
				Directory.CreateDirectory(_imagesRootPath);
			}

			string dirPath = Path.Combine(_imagesRootPath,
				id.HasValue ? id.ToString() : "_temp");


			if (!Directory.Exists(dirPath))
			{
				Directory.CreateDirectory(dirPath);
			}

			var filePath = Path.Combine(dirPath, Guid.NewGuid().ToString().Replace("-", "") + _extensionLookup[contentType]);

			File.WriteAllBytes(filePath, content);

			var imgUrl = filePath.Replace(AppDomain.CurrentDomain.BaseDirectory, "").Replace("\\", "/");

			if (id.HasValue)
			{
				await _productStore.AddImageAsync(id.Value, imgUrl);
			}

			//return Task.FromResult(filePath.Replace(_imagesRootPath, "").Replace("\\", "/"));
			return imgUrl;
		}
	}
}