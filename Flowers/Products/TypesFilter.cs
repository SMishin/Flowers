using System;
using System.Linq;

namespace Flowers.Products
{
	public class TypesFilter<TType>
		where TType : struct
	{
		public TypesFilter()
		{
			Types = new TType[0];
		}

		public TypesFilter(string[] stringValues)
		{
			Types = stringValues?.Select(t => Enum.Parse(typeof(TType),t)).Cast<TType>().ToArray() ?? new TType[0];
		}

		public TypesFilter(int[] values)
		{
			Types = values?.Select(t => Enum.Parse(typeof(TType), t.ToString())).Cast<TType>().ToArray() ?? new TType[0];
		}

		public TType[] Types { get; set; }

	}
}