CREATE PROCEDURE [dbo].[SelectFlowersFromBouquet]
	@Id	int
AS
	select 
		p.*
	,	f.*
	from [dbo].[Flowers] f
		join [dbo].[BouquetsFlowers] bf on f.Id = bf.FlowerId
		join Products p on p.Id = f.Id
	where bf.BouquetId = @Id
RETURN 0
