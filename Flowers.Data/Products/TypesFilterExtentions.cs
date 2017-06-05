using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Flowers.Products;

namespace Flowers.Data.Products
{
	public static class TypesFilterExtentions
	{
		public static DataTable GetTypesFromFilter<TType>(this TypesFilter<TType> filters)
			where TType : struct
		{
			DataTable types;

			if (filters?.Types == null || filters.Types.Length == 0)
			{
				types = TypesToDataTable(Enum.GetValues(typeof(TType)).Cast<TType>());
			}
			else
			{
				types = TypesToDataTable(filters.Types);
			}

			return types;
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