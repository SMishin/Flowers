using System.Collections.Generic;
using System.Data;
using Flowers.Products;

namespace Flowers.Data.Products
{
	public static class TypesFilterExtentions
	{
		public static DataTable GetTypesFromFilter<TType>(this TypesFilter<TType> filters)
			where TType : struct
		{
			return TypesToDataTable(filters.Types);
		}

		public static DataTable TypesToDataTable<TType>(this IEnumerable<TType> types)
		{
			var table = new DataTable();
			table.Columns.Add("Id", typeof(int));

			if (types == null)
			{
				return table;
			}

			foreach (var item in types)
			{
				table.Rows.Add(item);
			}

			return table;
		}
	}
}