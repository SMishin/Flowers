﻿namespace Flowers
{
    public class PagedResult<T>
    {
        public PagedResult()
        {
            Items = new T[0];
        }

        public T[] Items { get; set; }

        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
    }
}
