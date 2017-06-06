using System.Threading.Tasks;

namespace Flowers.Colors
{
	public interface IColorsReadOnlyStore 
	{
		Task<string[]> GetCodesAsync(Products.ProductTypes.ProductType productType);
		Task<Color[]> GetAsync();
		Task<Color> GetAsync(int id);
	}
}