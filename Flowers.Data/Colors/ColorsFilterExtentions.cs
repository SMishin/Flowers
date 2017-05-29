using System.Data;
using Flowers.Colors;

namespace Flowers.Data.Colors
{
	public static class ColorsFilterExtentions
	{
		public static DataTable ToDataTable(this ColorFilter filter)
		{
			return ColorsIdArrayToDataTable(filter.Colors);
		}

		public static DataTable ColorsIdArrayToDataTable(string[] colorIds)
		{
			var table = new DataTable();
			table.Columns.Add("Value", typeof(string));

			if (colorIds == null)
			{
				return table;
			}

			foreach (var item in colorIds)
			{
				table.Rows.Add(item);
			}

			return table;
		}
	}
}