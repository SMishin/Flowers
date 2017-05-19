using System.Linq;

namespace Flowers.Products.Flowers
{
	public class FlowersTypesFilter
	{
		public FlowersTypesFilter()
		{
			Types = new FlowerType[0];
		}

		public FlowersTypesFilter(string[] stringValues)
		{
			Types = stringValues?.Select(t => (FlowerType) System.Convert.ToInt32(t)).ToArray() ?? new FlowerType[0];
		}

		public FlowersTypesFilter(int[] values)
		{
			Types = values.Select(t => (FlowerType)t).ToArray();
		}

		public FlowerType[] Types { get; set; }

	}
}