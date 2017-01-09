CREATE TABLE [dbo].[ProductImages]
(
	[Id]			INT NOT NULL PRIMARY KEY identity(1,1),
	[ProductId]		int not null,
    [Url]			NVARCHAR(MAX) not NULL,
	[IsMain]		bit not null constraint [DF_ProductImages_IsMain] default (0)
	constraint [FK_ProductImages_ProductId] foreign key ([ProductId]) references [Products]([Id]),
)
