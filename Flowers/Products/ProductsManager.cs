using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Flowers.Products.ProductTypes;

namespace Flowers.Products
{
	public class ProductsManager : IProductsManager
	{
		private readonly IProductsStore _productsStore;
		private readonly string _imagesRootPath;
		private readonly string _productImagesDirectory = "products";

		private readonly Dictionary<string, string> _extensionLookup = new Dictionary<string, string>
		{
			{"image/jpeg", ".jpg"},
			{"image/png", ".png"}
		};

		public ProductsManager(IProductsStore productsStore, string imagesRootPath)
		{
			_productsStore = productsStore;
			_imagesRootPath = Path.Combine(imagesRootPath, _productImagesDirectory);
		}

		public async Task<PagedResult<Product>> GetPublishedWithMainImageAsync(ProductType type, int page = 1)
		{
			PagedResultsFactory factory = new PagedResultsFactory();

			var result = await factory.Create(
				(skip, take) => _productsStore.GetPublishedWithMainImageAsync(type, skip, take),
				() => _productsStore.CountPublishedAsync(type),
				page);

			return result;
		}

		public async Task<int> SaveAsync(Product product)
		{
			int id = await _productsStore.SaveAsync(product);

			if (id == 0)
			{
				id = product.Id;
			}

			await SetColorsAsync(id, product.Colors);

			return id;
		}

		public virtual async Task RemoveAsync(int id)
		{
			var images = await _productsStore.GetImagesAsync(id);

			foreach (var item in images)
			{
				RemoveImageFile(item);
			}

			await Task.WhenAll(_productsStore.RemoveImagesAsync(id), _productsStore.RemoveColorsAsync(id));
			await _productsStore.RemoveAsync(id);
		}

		public async Task<ProductImage> UploadImage(Stream stream, string contentType, int productId)
		{
			byte[] bytesInStream = new byte[stream.Length];
			stream.Position = 0;
			await stream.ReadAsync(bytesInStream, 0, bytesInStream.Length);
			return await UploadImage(bytesInStream, contentType, productId);
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

			var imgUrl = _productImagesDirectory + filePath.Replace(_imagesRootPath, "").Replace("\\", "/");

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

		public async Task RemoveImageAsync(int imageId)
		{
			var pi = await _productsStore.GetImageAsync(imageId);
			RemoveImageFile(pi);
			await _productsStore.RemoveImageAsync(imageId);

		}

		private void RemoveImageFile(ProductImage pi)
		{
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

			if (!Directory.EnumerateFiles(dirPath).Any())
			{
				Directory.Delete(dirPath);
			}
		}

		public Task SetColorsAsync(int productId, string[] colorIds)
		{
			return _productsStore.SetColorsAsync(productId, colorIds);
		}

	}
}