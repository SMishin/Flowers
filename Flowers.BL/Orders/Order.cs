using System;
using System.Collections.Generic;

namespace Flowers.BL.Orders
{
	public class Order
	{
		public Order()
		{
			DateTime = DateTime.Now;
		}

		public ShippingDetails Details { get; set; }
		public DateTime DateTime { get; set; }

		public Dictionary<int, int> Products { get; set; }

	}
}
