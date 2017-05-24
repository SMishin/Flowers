CREATE PROCEDURE [dbo].[SelectPublishedBouquetsWithMainImage]
	@Skip			int = 0,
	@Take			int = null,
	@Types			[IntArray] readonly
AS
	SELECT	
		p.Id,
		p.Name,
		p.Summary,
		p.Description,
		p.Price,
		b.Type as BouquetType
		,pi.Url as [ImageUrl]
	FROM [dbo].[Bouquets] b
		join [dbo].[Products] p on b.Id = p.Id
		left join [dbo].[ProductImages] pi on p.Id = pi.[ProductId] and pi.IsMain = 1
	where 
		p.Published = 1
		and b.[Type] in (select Id from  @Types)
	group by p.Id, b.Type, p.name, p.Summary, p.Description, p.Price, p.Published, pi.[Url] 
	ORDER BY p.[Id]
	OFFSET     @Skip ROWS       -- skip  rows
	FETCH NEXT @Take ROWS ONLY; -- take  rows

RETURN 0
