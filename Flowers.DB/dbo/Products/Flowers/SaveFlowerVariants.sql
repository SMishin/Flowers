CREATE PROCEDURE [dbo].[SaveFlowerVariants]
	@FlowerId		int,
	@FlowerPrices	[FlowerPrices] readonly
AS

	MERGE
	INTO	[dbo].FlowerVariants AS [target]
	USING	@FlowerPrices AS [source]
		ON	[target].[FlowerId] = @FlowerId and [target].[Size] = [source].[Size] 
	WHEN MATCHED THEN
		UPDATE
			SET	[target].[Price] = [source].[Price]
	
	WHEN NOT MATCHED BY TARGET THEN
		INSERT
		VALUES
		(	@FlowerId
		,	[source].[Size]
		,	[source].[Price]
		)
	
	WHEN NOT MATCHED BY Source THEN
		delete
		;

RETURN 0
