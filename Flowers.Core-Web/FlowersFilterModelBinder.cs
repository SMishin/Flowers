using System;
using System.Threading.Tasks;
using Flowers.Products.Flowers;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Flowers.CoreWeb
{
    public class FlowersFilterModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            ValueProviderResult val = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);

            if (val == null)
            {
                throw new NullReferenceException();
            }

            FlowersTypesFilter result = new FlowersTypesFilter(val.FirstValue?.Split(','));

            bindingContext.Result = ModelBindingResult.Success(result);
            return Task.CompletedTask;
        }
    }
}
