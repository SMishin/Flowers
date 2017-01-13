CREATE PROCEDURE [dbo].[SelectProductsWithMainImage]
	@ProductType int,
	@Skip int = 0,
	@Take int = null
AS
	SELECT	p.*
			,pi.Url as [ImageUrl]
  FROM [dbo].[Products] p
  left join [dbo].[ProductImages] pi on p.Id = pi.[ProductId] and pi.IsMain = 1
  where p.Type = @ProductType

RETURN 0
