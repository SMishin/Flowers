CREATE PROCEDURE [dbo].[SelectRandomPublishedFlowersWithMainImage]
	@Count	int
AS
	SELECT top(@Count)
			p.*
			,pi.Url as [ImageUrl]
			,min(fv.price) as MinPrice
			,max(fv.price) as MaxPrice
	FROM [dbo].[Products] p
		left join [dbo].[ProductImages] pi on p.Id = pi.[ProductId] and pi.IsMain = 1
		left join [dbo].[FlowerVariants] fv on fv.[FlowerId] = p.Id
	where p.Type = 0 and p.Published = 1
	group by p.Id,p.Type, p.name, p.Summary, p.Description, p.Published, p.Price, pi.[Url] 
	ORDER BY newid()

RETURN 0
