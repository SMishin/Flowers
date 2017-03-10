CREATE PROCEDURE [dbo].[SaveProduct]
	@Id				int,
	@Type			int,
	@Name			nvarchar(500),
	@Summary		nvarchar(1000) = null,
	@Description	nvarchar(max) = null, 
	@Price			money = null,
	@Published		bit  = null
 
AS
	if(exists (select null from [Products] where [Id] =  @Id))
		update [Products]
		set	[Type] = @Type,
			[Name] = @Name,
			[Summary] = @Summary,
			[Description] = @Description,
			[Price] = @Price,
			[Published] = @Published
		
		where [Id] =  @Id
	else
		begin
			insert into [Products] ([Type], [Name], [Summary], [Description], [Price], [Published])
			values(@Type, @Name, @Summary, @Description, @Price, @Published)	
			select @@Identity
		end
RETURN 0
