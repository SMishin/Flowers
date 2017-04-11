CREATE TABLE [dbo].[FlowerVariants]
(
	[Id]		uniqueidentifier not null primary key default(newid()),
	[FlowerId]	INT NOT NULL,
	[Size]		int null,
	[Price]		money not null,
	constraint [FK_FlowerVariants_FlowerId] foreign key ([FlowerId]) references [Flowers]([Id]),
)
