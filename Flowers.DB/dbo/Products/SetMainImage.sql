CREATE PROCEDURE [dbo].[SetMainImage]
	@ProductId		int,
	@ImageId		int 
AS
	update [dbo].[ProductImages]
	set [IsMain] = 0
	where [ProductId] = @ProductId

	update [dbo].[ProductImages]
	set [IsMain] = 1
	where [Id] = @ImageId and [ProductId] = @ProductId 
	
RETURN 0
