CREATE PROCEDURE [dbo].[SelectBouquetsWithMainImage]
	@Skip			int = 0
,	@Take			int = null
,	@Published		bit = null
,	@Types			[IntArray] readonly
,	@Colors			[VarcharArray] readonly
,	@MinPrice		money = null
,	@MaxPrice		money = null
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
			left join [dbo].[ProductsColors] pc on pc.ProductId = p.Id'

		set @sqlWhere = @sqlWhere + N'
			and (pc.ColorId in (select Value from @Colors) or pc.ColorId is null)'

	end

	if (@Published is not null)
	begin
		set @sqlWhere += N'
			and p.Published = 1'
	end
	
	if (@MinPrice is not null)
	begin
		set @sqlWhere += N'
			and p.[Price] >= @MinPrice'
	end

	if (@MaxPrice is not null)
	begin
		set @sqlWhere += N'
			and p.[Price] <= @MaxPrice'
	end

	set @sqlCommand = @sqlCommand + @sqlJoin + @sqlWhere + 
		N' 
		group by p.Id, b.Type, p.name, p.Summary, p.Description, p.Price, p.Published, pi.[Url] 
		ORDER BY p.[Id]
		OFFSET     @Skip ROWS       -- skip  rows
		FETCH NEXT @Take ROWS ONLY; -- take  rows'
	
	EXEC sp_executesql @sqlCommand
		,	N'@Skip int, @Take int, @Types [IntArray] readonly, @Colors [VarcharArray] readonly, @MinPrice money, @MaxPrice money'
		,	@Skip 
		,	@Take 
		,	@Types 
		,	@Colors
		,	@MinPrice
		,	@MaxPrice

RETURN 0
