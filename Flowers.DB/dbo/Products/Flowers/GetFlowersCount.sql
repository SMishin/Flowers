CREATE PROCEDURE [dbo].[GetFlowersCount]
	@Published	bit = null
,	@Types		[IntArray] readonly
,	@Colors		[VarcharArray] readonly
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
	
	set @sqlCommand = @sqlCommand + @sqlJoin + @sqlWhere;

	EXEC sp_executesql @sqlCommand
		,	N'@Types [IntArray] readonly, @Colors [VarcharArray] readonly'
		,	@Types 
		,	@Colors

RETURN 0
