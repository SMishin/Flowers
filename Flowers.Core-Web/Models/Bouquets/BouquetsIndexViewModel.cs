using Flowers.Products;
using Flowers.Products.Bouquets;

namespace Flowers.CoreWeb.Models.Bouquets
{
	public class BouquetsIndexViewModel : ProductListModel<Bouquet>
	{
		public BouquetsIndexViewModel()
		{
			BouquetsTypesFilter = new TypesFilter<BouquetType>();
		}
	
		public TypesFilter<BouquetType> BouquetsTypesFilter { get; set; }
	}
}