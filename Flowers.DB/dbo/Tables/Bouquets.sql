CREATE TABLE [dbo].[Bouquets]
(
	[Id]	INT NOT NULL PRIMARY KEY,
	[Type]	int not null default (0),
	constraint [FK_Bouquets_Id] foreign key (Id) references [Products]([Id])
)
