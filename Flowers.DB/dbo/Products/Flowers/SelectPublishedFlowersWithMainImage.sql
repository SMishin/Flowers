CREATE PROCEDURE [dbo].[SelectPublishedFlowersWithMainImage]
	@Skip			int = 0,
	@Take			int = null,
	@Types			[IntArray] readonly
AS
	SELECT	
		p.Id,
		p.Name,
		p.Summary,
		p.Description,
		f.Type as FlowerType
		,pi.Url as [ImageUrl]
		,min(fv.Price) as MinPrice
		,max(fv.Price) as MaxPrice
	FROM [dbo].[Flowers] f
		join [dbo].[Products] p on f.Id = p.Id
		left join [dbo].[ProductImages] pi on p.Id = pi.[ProductId] and pi.IsMain = 1
		left join [dbo].[FlowerVariants] fv on fv.[FlowerId] = p.Id
	where 
		p.Published = 1
		and f.[Type] in (select Id from  @Types)
	group by p.Id, f.Type, p.name, p.Summary, p.Description, p.Published, pi.[Url] 
	ORDER BY p.[Id]
	OFFSET     @Skip ROWS       -- skip  rows
	FETCH NEXT @Take ROWS ONLY; -- take  rows

RETURN 0
