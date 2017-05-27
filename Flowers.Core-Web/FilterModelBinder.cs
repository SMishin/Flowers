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

			bindingContext.Result = ModelBindingResult.Success(Activator.CreateInstance(typeof(TFilter), val.FirstValue != null ? new object[] { val.FirstValue.Split(',') } : null));
			return Task.CompletedTask;
		}
	}
}