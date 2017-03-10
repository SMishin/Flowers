CREATE PROCEDURE [dbo].[SelectPublishedProductsWithMainImage]
	@ProductType	int,
	@Skip			int = 0,
	@Take			int = null
AS
	SELECT	p.*
			,pi.Url as [ImageUrl]
  FROM [dbo].[Products] p
  left join [dbo].[ProductImages] pi on p.Id = pi.[ProductId] and pi.IsMain = 1
  where p.Type = @ProductType and p.Published = 1
  ORDER BY p.[Id]
	OFFSET     @Skip ROWS       -- skip  rows
	FETCH NEXT @Take ROWS ONLY; -- take  rows

RETURN 0
