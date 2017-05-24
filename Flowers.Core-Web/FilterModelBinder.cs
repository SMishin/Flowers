using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Flowers.CoreWeb
{
	public class FilterModelBinder<TFilter> : IModelBinder
	{
		public Task BindModelAsync(ModelBindingContext bindingContext)
		{
			ValueProviderResult val = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);

			if (val == null)
			{
				throw new NullReferenceException();
			}

			TFilter result = (TFilter)Activator.CreateInstance(typeof(TFilter), val.FirstValue?.Split(',') );//new TFilter(val.FirstValue?.Split(','));

			bindingContext.Result = ModelBindingResult.Success(result);
			return Task.CompletedTask;
		}
	}
}