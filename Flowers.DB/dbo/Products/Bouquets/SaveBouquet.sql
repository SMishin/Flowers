CREATE PROCEDURE [dbo].[SaveBouquet]
	@Id				int,
	@Type			int
AS
	if(exists (select null from [Bouquets] where [Id] =  @Id))
		update [Bouquets]
			set	[Type] = @Type
		where [Id] =  @Id
	else
		begin
			insert into [Bouquets] ([Id],[Type])
			values(@Id, @Type)	
		end
RETURN 0
