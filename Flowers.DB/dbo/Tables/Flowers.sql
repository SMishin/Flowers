CREATE TABLE [dbo].[Flowers]
(
	[Id]	INT NOT NULL PRIMARY KEY
,	[FlowersTypeId]	int not null default (0)
,	constraint [FK_Flowers_Id] foreign key (Id) references [Products]([Id])
,	constraint [FK_Flowers_Type] foreign key ([FlowersTypeId]) references [FlowersType]([Id])
)
