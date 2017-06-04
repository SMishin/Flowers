CREATE PROCEDURE [dbo].[SelectFlowersWithMainImage]
	@Skip			int = 0
,	@Take			int = null
,	@Published		bit = null
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
			f.Type as FlowerType
			,pi.Url as [ImageUrl]
			,min(fv.Price) as MinPrice
			,max(fv.Price) as MaxPrice
		FROM [dbo].[Flowers] f'
	
	set @sqlJoin = N'
		join [dbo].[Products] p on f.Id = p.Id
		left join [dbo].[ProductImages] pi on p.Id = pi.[ProductId] and pi.IsMain = 1
		left join [dbo].[FlowerVariants] fv on fv.[FlowerId] = p.Id'

	set @sqlWhere = N'
			where 
			f.[Type] in (select Id from  @Types)'

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
	
	set @sqlCommand = @sqlCommand + @sqlJoin + @sqlWhere + 
		N' 
		group by p.Id, f.Type, p.name, p.Summary, p.Description, p.Published, pi.[Url] 
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
