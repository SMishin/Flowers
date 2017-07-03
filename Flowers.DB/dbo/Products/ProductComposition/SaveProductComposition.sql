CREATE PROCEDURE [dbo].[SaveProductComposition]
	@MaindProductId		int,
	@ProductId			int,
	@Count				int
 
AS
	if(exists (select null from [dbo].[ProductComposition] where [MaindProductId] = @MaindProductId and [ProductId] = @ProductId))
		update [dbo].[ProductComposition]
			set [Count] = @Count
		where [MaindProductId] =  @MaindProductId and [ProductId] = @ProductId
	else
		insert into [dbo].[ProductComposition] values (@MaindProductId, @ProductId, @Count)
RETURN 0
