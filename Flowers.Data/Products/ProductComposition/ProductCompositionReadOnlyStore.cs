using Flowers.Products.ProductComposition;

namespace Flowers.Data.Products.ProductComposition
{
	public class ProductCompositionReadOnlyStore : IProductCompositionStoreReadOnlyStore
	{
		protected readonly ISqlConnectionHelper SqlConnectionHelper;

		public ProductCompositionReadOnlyStore(ISqlConnectionHelper sqlConnectionHelper)
		{
			SqlConnectionHelper = sqlConnectionHelper;
		}

	}
}