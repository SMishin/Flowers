using System.Threading.Tasks;

namespace Flowers.Colors
{
	public class ColorsManager : IColorsManager
	{
		private readonly IColorsStore _colorsStore;

		public ColorsManager(IColorsStore colorsStore)
		{
			_colorsStore = colorsStore;
		}
		public Task SaveAsync(Color color)
		{
			return _colorsStore.SaveAsync(color);
		}

		public Task RemoveAsync(string id)
		{
			return _colorsStore.RemoveAsync(id[0] != '#' ? '#' + id : id);
		}
	}
}