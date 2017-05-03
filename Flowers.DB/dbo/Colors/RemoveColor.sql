CREATE PROCEDURE [dbo].[RemoveColor]
	@Id	varchar(7)
AS
	delete [Colors] where [Id] =  @Id

