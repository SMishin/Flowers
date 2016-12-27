CREATE TABLE [dbo].[OrderProduct]
(
	[OrderId] INT NOT NULL,
	[ProductId] int not null,
	[Count] int not null,
	constraint [PK_OrderProduct] primary key([OrderId], [ProductId]),
	constraint [FK_OrderProduct_OrderId] foreign key ([OrderId]) references [Order]([Id]) on delete cascade,
	constraint [FK_OrderProduct_ProductId] foreign key ([ProductId]) references [Products]([Id]) on delete cascade,
)
