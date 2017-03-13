CREATE TABLE [dbo].[Flowers]
(
	[Id]	INT NOT NULL PRIMARY KEY,
	[Type]	int not null default (0),
	constraint [FK_Flowers_Id] foreign key (Id) references [Products]([Id])
)
