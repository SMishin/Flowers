using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;
using System.Web.Http.ValueProviders;
using Flowers.Products.Flowers;

namespace Flowers.Api.Products.Flowers
{
    public class FlowersFilterModelBinder : IModelBinder
    {
        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
            if (bindingContext.ModelType != typeof(FlowersFilter))
            {
                return false;
            }

            ValueProviderResult val = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);

            if (val == null)
            {
                return false;
            }

            FlowersFilter result = new FlowersFilter(val.AttemptedValue.Split(','));

            bindingContext.Model = result;
            return true;

        }
    }
}
