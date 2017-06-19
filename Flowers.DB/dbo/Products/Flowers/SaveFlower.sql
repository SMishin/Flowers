CREATE PROCEDURE [dbo].[SaveFlower]
	@Id				int,
	@Type			int
AS
	if(exists (select null from [Flowers] where [Id] =  @Id))
		update [Flowers]
			set	[FlowersTypeId] = @Type
		where [Id] =  @Id
	else
		begin
			insert into [Flowers] ([Id], [FlowersTypeId])
			values(@Id, @Type)	
		end
RETURN 0
