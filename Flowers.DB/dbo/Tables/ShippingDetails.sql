CREATE TABLE [dbo].[ShippingDetails]
(
	[Id]				INT NOT NULL PRIMARY KEY identity(1,1),
	[PersonId]			int not null,
	[DeliveryTypeId]	int null,
	[Address]			nvarchar(4000) not null,
	constraint [FK_ShippingDetails_PersonId] foreign key ([PersonId]) references [Person]([Id]) on delete cascade,
	constraint [FK_ShippingDetails_DeliveryTypeId] foreign key ([DeliveryTypeId]) references [DeliveryTypes]([Id]) on delete cascade
)
