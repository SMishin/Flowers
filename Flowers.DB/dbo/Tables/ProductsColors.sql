CREATE TABLE [dbo].[ProductsColors]
(
	[ProductId]		INT not null,
	[ColorId]		varchar(6) NOT NULL,
	constraint [PK_ProdursColors] primary key ([ProductId],[ColorId]),
	constraint [FK_ProdursColors_Products] foreign key ([ProductId]) references [Products] (Id),
	constraint [FK_ProdursColors_Colors] foreign key ([ColorId]) references [Colors] (Id),
)
