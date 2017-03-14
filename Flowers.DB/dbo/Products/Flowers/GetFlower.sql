CREATE PROCEDURE [dbo].[GetFlower]
	@Id	int
AS
	select
		p.*,
		f.[Type] as 'FlowerType'
		--,fv.*
	from [Flowers] f
		join [Products] p on f.[Id] = p.[Id]
		--left join [dbo].[FlowerVariants] fv on fv.FlowerId = f.Id
	where f.Id = @Id
RETURN 0
