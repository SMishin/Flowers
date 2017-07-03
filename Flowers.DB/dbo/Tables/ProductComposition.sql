CREATE TABLE [dbo].[ProductComposition]
(
	[MaindProductId]	int not null
,	[ProductId]			int not null
,	[Count]				int not null default 1
,	constraint [FK_ProductComposition_MaindProductId]foreign key ([MaindProductId]) references [Products]([Id])
,	constraint [FK_ProductComposition_ProductId] foreign key ([ProductId]) references [Products]([Id])
,	constraint [PK_BouquetsFlowers] primary key ([MaindProductId],[ProductId])
)
