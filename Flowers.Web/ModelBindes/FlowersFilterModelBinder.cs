
using System.Web.Mvc;
using Flowers.Products.Flowers;

namespace Flowers.Web.ModelBindes
{
    public class FlowersFilterModelBinder : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {

            if (bindingContext.ModelType != typeof(FlowersFilter))
            {
                return null;
            }

            ValueProviderResult val = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);

            if (val == null)
            {
                return null;
            }

            FlowersFilter result = new FlowersFilter(val.AttemptedValue.Split(','));

            return result;
        }
    }
}
