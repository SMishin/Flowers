using System;
using System.Threading.Tasks;

namespace Flowers
{
	public class PagedResultsFactory
	{
		public async Task<PagedResult<T>> Create<T>(Func<int, int, Task<T[]>> dataProvider, Func<Task<int>> countProvider, int page = 1)
		{
			int _pageSize = 6;

			var dataTask = dataProvider((page - 1) * _pageSize, _pageSize);
			var countTask = countProvider();

			await Task.WhenAll(dataTask, countTask);

			if (dataTask.Result.Length == 0 && countTask.Result > 0)
			{
				page = countTask.Result / _pageSize + (countTask.Result % _pageSize > 0 ? 1 : 0);
				dataTask = dataProvider((page - 1) * _pageSize, _pageSize);
				await dataTask;
			}
			else if (countTask.Result == 0)
			{
				page = 1;
			}

			return new PagedResult<T>
			{
				Items = dataTask.Result,
				TotalCount = countTask.Result,
				Page = page,
				PageSize = _pageSize
			};
		}
	}
}