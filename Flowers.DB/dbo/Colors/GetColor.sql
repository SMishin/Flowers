CREATE PROCEDURE [dbo].[GetColor]
	@Id	varchar(7)
AS
	select
		*
	from [Colors] f
	where f.Id = @Id
RETURN 0
