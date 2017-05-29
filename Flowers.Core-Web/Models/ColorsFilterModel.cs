using Flowers.Colors;

namespace Flowers.CoreWeb.Models
{
	public class ColorsFilterModel
	{
		public ColorsFilterModel()
		{
			ColorFilter = new ColorFilter();
			Colors = new Color[0];
		}

		public Color[] Colors { get; set; }
		public ColorFilter ColorFilter { get; set; }
	}
}