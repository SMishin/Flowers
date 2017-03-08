CREATE PROCEDURE [dbo].[SaveProductImage]
	@ProductId	int,
	@Url		nvarchar(max)
 
AS
	insert into [ProductImages] ([ProductId], [Url])
	values(@ProductId, @Url)	
	select @@Identity
		
RETURN 0
