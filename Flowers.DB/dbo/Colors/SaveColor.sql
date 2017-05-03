CREATE PROCEDURE [dbo].[SaveColor]
	@Id				varchar(7),
	@Name			nvarchar(100)
AS
	if(exists (select null from [Colors] where [Id] =  @Id))
		update [Colors]
			set	[Name] = @Name
		where [Id] =  @Id
	else
		begin
			insert into [Colors] ([Id], [Name])
			values(@Id, @Name)	
		end
RETURN 0
