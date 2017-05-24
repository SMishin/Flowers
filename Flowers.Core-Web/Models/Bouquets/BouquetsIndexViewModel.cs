using Flowers.Products.Bouquets;

namespace Flowers.CoreWeb.Models.Bouquets
{
	public class BouquetsIndexViewModel : ProductListMode<Bouquet>
	{
		public BouquetsIndexViewModel()
		{
			Filter = new BouquetsTypesFilter();
		}
	
		public BouquetsTypesFilter Filter { get; set; }
	}
}