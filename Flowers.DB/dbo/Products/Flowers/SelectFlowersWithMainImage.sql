CREATE PROCEDURE [dbo].[SelectFlowersWithMainImage]
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
			p.Id
			,p.Name
			,p.Summary
			,p.Description
			,f.[FlowersTypeId] as FlowerType
			,pi.Url as [ImageUrl]
			,[range].MinPrice
			,[range].MaxPrice
		FROM [dbo].[Flowers] f'
	
	set @sqlJoin = N'
		join [dbo].[Products] p on f.Id = p.Id
		left join [dbo].[ProductImages] pi on p.Id = pi.[ProductId] and pi.IsMain = 1
		left join (select 
					fv.FlowerId
					,min(fv.Price) as MinPrice
					,max(fv.Price) as MaxPrice
				 from [dbo].[FlowerVariants] fv 
				 group by fv.FlowerId) [range] on f.Id = [range].FlowerId'

	set @sqlWhere = N'
					where 1 = 1'

	if(exists (select null from @Types))
	begin
		set @sqlWhere += N'
			and f.[FlowersTypeId] in (select Id from  @Types)'
	end

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
			and (@MinPrice is not null and @MinPrice <= isnull([range].MaxPrice,0))'
	end

	if (@MaxPrice is not null)
	begin
		set @sqlWhere += N'
			and (@MaxPrice is not null and @MaxPrice >= isnull([range].MinPrice,0))'
	end
	
	set @sqlCommand = @sqlCommand + @sqlJoin + @sqlWhere + 
		N' 
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
