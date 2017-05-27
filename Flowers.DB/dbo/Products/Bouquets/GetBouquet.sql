CREATE PROCEDURE [dbo].[GetBouquet]
	@Id	int
AS
	select
		p.*,
		b.[Type] as 'BouquetType'
	from [Bouquets] b
		join [Products] p on b.[Id] = p.[Id]
	where b.Id = @Id
RETURN 0
