using System.Linq;

namespace Flowers.Colors
{
	public class ColorFilter
	{
		public ColorFilter()
		{
			Colors = new string[0];
		}

		public ColorFilter(string[] stringValues)
		{
			Colors = stringValues.Select(t => t[0] != '#' ? "#" + t : t).ToArray();
		}

		public string[] Colors { get; set; }

	}
}