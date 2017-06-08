namespace Flowers.Products
{
	public class PriceFilter
	{
		public PriceFilter()
		{
			
		}

		public PriceFilter(string[] stringValues)
		{
			if (stringValues.Length > 0)
			{
				From = System.Convert.ToDecimal(stringValues[0]);
			}

			if (stringValues.Length > 1)
			{
				To = System.Convert.ToDecimal(stringValues[1]);
			}

		}

		public decimal? From { get; set; }
		public decimal? To { get; set; }

	}
}