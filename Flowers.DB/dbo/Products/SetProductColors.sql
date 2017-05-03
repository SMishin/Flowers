CREATE PROCEDURE [dbo].[SetProductsColors]
	@ProductId		int,
	@Colors			[VarcharArray] readonly
AS
	delete [dbo].[ProductsColors]
	where [ProductId] = @ProductId

	insert [dbo].[ProductsColors]
	select
		@ProductId as ProductId,
		[Value] as ColorId
	from @Colors
	
RETURN 0
