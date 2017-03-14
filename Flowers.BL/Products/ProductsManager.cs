using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Flowers.BL.Products
{
	public class ProductsManager : IProductsManager
	{
		private readonly IProductsStore _productsStore;
		private readonly string _imagesRootPath;

		private readonly Dictionary<string, string> _extensionLookup = new Dictionary<string, string>
		{
			{"image/jpeg", ".jpg"},
		};

		public ProductsManager(IProductsStore productsStore, string imagesRootPath)
		{
			_productsStore = productsStore;
			_imagesRootPath = imagesRootPath;
		}
		public Task<int> SaveAsync(Product product)
		{
			return _productsStore.SaveAsync(product);
		}

		public async Task<ProductImage> UploadImage(byte[] content, string contentType, int productId)
		{
			if (!Directory.Exists(_imagesRootPath))
			{
				Directory.CreateDirectory(_imagesRootPath);
			}

			string dirPath = Path.Combine(_imagesRootPath, productId.ToString());

			if (!Directory.Exists(dirPath))
			{
				Directory.CreateDirectory(dirPath);
			}

			var filePath = Path.Combine(dirPath, Guid.NewGuid().ToString().Replace("-", "") + _extensionLookup[contentType]);

			File.WriteAllBytes(filePath, content);

			var imgUrl = filePath.Replace(AppDomain.CurrentDomain.BaseDirectory, "").Replace("\\", "/");

			var imageId = await _productsStore.AddImageAsync(productId, imgUrl);

			return new ProductImage
			{
				Id = imageId,
				ProductId = productId,
				Url = imgUrl
			};
		}

		public Task SetMainImageAsync(int productId, int imageId)
		{
			return _productsStore.SetmMainImageAsync(productId, imageId);
		}

		public async Task RemoveImageAsync(int id)
		{
			var pi = await _productsStore.GetImageAsync(id);

			if (!Directory.Exists(_imagesRootPath))
			{
				return;
			}

			string dirPath = Path.Combine(_imagesRootPath, pi.ProductId.ToString());

			if (!Directory.Exists(dirPath))
			{
				return;
			}

			var filePath = Path.Combine(dirPath, pi.Url.Replace('/', '\\'));
			filePath = string.Join("\\", filePath.Split('\\').Distinct().ToArray());

			File.Delete(filePath);
			await _productsStore.RemoveImageAsync(id);

		}
	}
}