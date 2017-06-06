CREATE PROCEDURE [dbo].[SelectProductsColors]
	@ProductTypeId		int
AS
	select distinct
		pc.ColorId
	from [dbo].[ProductsColors] pc
	join Products p on p.Id = pc.ProductId
	where p.Type = @ProductTypeId
 
RETURN 0
