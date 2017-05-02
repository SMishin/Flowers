using System.Threading.Tasks;
using Flowers.Products;

namespace Flowers.Colors
{
	public class ColorsManager : IColorsManager
	{
		private readonly IColorsStore colorsStore;

		public ColorsManager(IColorsStore colorsStore)
		{
			this.colorsStore = colorsStore;
		}
		public Task<int> SaveAsync(Product product)
		{
			return colorsStore.SaveAsync();
		}

		public Task RemoveAsync(int id)
		{
			
		}
	}
}