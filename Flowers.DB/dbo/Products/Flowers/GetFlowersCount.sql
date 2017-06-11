CREATE PROCEDURE [dbo].[GetFlowersCount]
	@Published	bit = null
,	@Types		[IntArray] readonly
,	@Colors		[VarcharArray] readonly
,	@MinPrice		money = null
,	@MaxPrice		money = null
AS
	declare @sqlCommand nvarchar (1000);
	declare @sqlJoin nvarchar (1000);
	declare @sqlWhere nvarchar (1000);

	set @sqlCommand = N'
		select 
		count(*) from dbo.[Flowers] f'
	
	set @sqlJoin = N'
		join dbo.[Products] p on f.Id = p.Id'

	set @sqlWhere = N'
			where 1=1'

	if (@Published is not null)
	begin
		set @sqlWhere += N'
			and p.Published = 1'
	end

	if (exists (select null from  @Types)) 
	begin
		
		set @sqlWhere += N'
			and f.[Type] in (select Id from  @Types)'

	end

	if (exists (select null from  @Colors)) 
	begin
		
		set @sqlJoin += N'
			join [dbo].[ProductsColors] pc on p.Id = pc.ProductId'

		set @sqlWhere += N'
			and pc.ColorId in (select Value from @Colors)'

	end

	if (@MinPrice is not null or @MaxPrice is not null)
	begin
		
		set @sqlJoin += N'
			left join (select 
					fv.FlowerId
					,min(fv.Price) as MinPrice
					,max(fv.Price) as MaxPrice
				 from [dbo].[FlowerVariants] fv 
				 group by fv.FlowerId) [range] on f.Id = [range].FlowerId'

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
	end

	
	
	set @sqlCommand = @sqlCommand + @sqlJoin + @sqlWhere;

	EXEC sp_executesql @sqlCommand
		,	N'@Types [IntArray] readonly, @Colors [VarcharArray] readonly, @MinPrice money, @MaxPrice money'
		,	@Types 
		,	@Colors
		,	@MinPrice
		,	@MaxPrice

RETURN 0
