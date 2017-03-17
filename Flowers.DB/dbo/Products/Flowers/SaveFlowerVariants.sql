CREATE PROCEDURE [dbo].[SaveFlowerVariants]
	@FlowerId		int,
	@FlowerPrices	[FlowerPrices] readonly
AS

	delete [dbo].[FlowerVariants]
	where [FlowerId] = @FlowerId

	insert into [dbo].[FlowerVariants]
	select @FlowerId as FlowerId, [Size],[Price] from @FlowerPrices
	

RETURN 0
