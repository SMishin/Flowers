CREATE PROCEDURE [dbo].[SaveFlowerType]
	@Id				int,
	@Name			nvarchar(500)
AS
	if(exists (select null from [FlowersType] where [Id] =  @Id))
		update [FlowersType]
			set	[Name] = @Name		
		where [Id] =  @Id
	else
		begin
			insert into [FlowersType] ([Name])
			values(@Name)	
			select @@Identity
		end
RETURN 0
