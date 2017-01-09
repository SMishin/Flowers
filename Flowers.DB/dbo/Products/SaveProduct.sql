CREATE PROCEDURE [dbo].[SaveProduct]
	@Id				int,
	@Type			int,
	@Name			nvarchar(500),
	@Summary		nvarchar(1000) null,
	@Description	nvarchar(max) null, 
	@Price			money null
 
AS
	if(exists (select null from [Products] where [Id] =  @Id))
		update [Products]
		set	[Type] = @Type,
			[Name] = @Name,
			[Summary] = @Summary,
			[Description] = @Description,
			[Price] = @Price
		
		where [Id] =  @Id
	else
		begin
			insert into [Products]
			values(@Type, @Name, @Summary, @Description, @Price)	
		end
RETURN 0
