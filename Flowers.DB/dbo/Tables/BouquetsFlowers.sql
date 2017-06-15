CREATE TABLE [dbo].[BouquetsFlowers]
(
	[BouquetId]	int not null
,	[FlowerId]	int not null
,	constraint [FK_BouquetsFlowers_BouquetId] foreign key ([BouquetId]) references [Bouquets]([Id])
,	constraint [FK_BouquetsFlowers_FlowerId] foreign key ([FlowerId]) references [Flowers]([Id])
,	constraint [PK_BouquetsFlowers] primary key ([BouquetId],[FlowerId])
)
