using System.Linq;

namespace Flowers.Products.Flowers
{
	public class FlowersFilter
	{
		public FlowersFilter()
		{
			Types = new FlowerType[0];
		}

		public FlowersFilter(string[] stringValues)
		{
			Types = stringValues?.Select(t => (FlowerType) System.Convert.ToInt32(t)).ToArray() ?? new FlowerType[0];
		}

		public FlowersFilter(int[] values)
		{
			Types = values.Select(t => (FlowerType)t).ToArray();
		}

		public FlowerType[] Types { get; set; }

	}
}