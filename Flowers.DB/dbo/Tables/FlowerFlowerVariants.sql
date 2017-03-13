CREATE TABLE [dbo].[FlowerVariants]
(
	[FlowerId]	INT NOT NULL,
	[Size]		int not null,
	[Price]		money not null,
	constraint [PK_FlowerVariants_FlowerId_Size] primary key ([FlowerId], [Size]),
	constraint [FK_FlowerVariants_FlowerId] foreign key ([FlowerId]) references [Flowers]([Id]),
)
