﻿namespace Flowers.Web.Models
{
	public class PagingModel
	{
		public int ItemsCount { get; set; }
		public int Count { get; set; }
		public int PageSize { get; set; }
		public int Page { get; set; }
	}
}