CREATE PROCEDURE [dbo].[SelectPublishedBouquetsWithMainImage]
	@Skip			int = 0
,	@Take			int = null
,	@Types			[IntArray] readonly
,	@Colors			[VarcharArray] readonly
AS
	declare @sqlCommand nvarchar (1000);
	declare @sqlJoin nvarchar (1000);
	declare @sqlWhere nvarchar (1000);
	
	set @sqlCommand = N'
	SELECT	
		p.Id,
		p.Name,
		p.Summary,
		p.Description,
		p.Price,
		b.Type as BouquetType
		,pi.Url as [ImageUrl]
	FROM [dbo].[Bouquets] b'

	set @sqlJoin = N'
		join [dbo].[Products] p on b.Id = p.Id
		left join [dbo].[ProductImages] pi on p.Id = pi.[ProductId] and pi.IsMain = 1'

	set @sqlWhere = N'
		where 
		p.Published = 1
		and b.[Type] in (select Id from  @Types)'
		
	if (exists (select null from  @Colors)) 
	begin
		
		set @sqlJoin = @sqlJoin + N'
			join [dbo].[ProductsColors] pc on p.Id = pc.ProductId'

		set @sqlWhere = @sqlWhere + N'
			and pc.ColorId in (select Value from @Colors)'

	end

	set @sqlCommand = @sqlCommand + @sqlJoin + @sqlWhere + 
		N' 
		group by p.Id, b.Type, p.name, p.Summary, p.Description, p.Price, p.Published, pi.[Url] 
		ORDER BY p.[Id]
		OFFSET     @Skip ROWS       -- skip  rows
		FETCH NEXT @Take ROWS ONLY; -- take  rows'
	
	EXEC sp_executesql @sqlCommand
		,	N'@Skip int, @Take int, @Types [IntArray] readonly, @Colors [VarcharArray] readonly'
		,	@Skip 
		,	@Take 
		,	@Types 
		,	@Colors

RETURN 0
