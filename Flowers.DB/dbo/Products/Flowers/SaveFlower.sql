CREATE PROCEDURE [dbo].[SaveFlower]
	@Id				int,
	@Type			int
AS
	if(exists (select null from [Flowers] where [Id] =  @Id))
		update [Flowers]
			set	[Type] = @Type
		where [Id] =  @Id
	else
		begin
			insert into [Flowers] ([Id],[Type])
			values(@Id, @Type)	
		end
RETURN 0
