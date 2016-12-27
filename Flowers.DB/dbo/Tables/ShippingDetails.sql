CREATE TABLE [dbo].[ShippingDetails]
(
	[Id]				INT NOT NULL PRIMARY KEY identity(1,1),
	[PersonId]			int not null,
	[DeliveryTypeId]	int null,
	[OrganizationName]	nvarchar(400) null,
	[Inn]				nvarchar(400) null,
	[Kpp]				nvarchar(400) null,
	[Address]			nvarchar(4000) not null,
	constraint [FK_ShippingDetails_PersonId] foreign key ([PersonId]) references [Person]([Id]) on delete cascade,
	constraint [FK_ShippingDetails_DeliveryTypeId] foreign key ([DeliveryTypeId]) references [DeliveryTypes]([Id]) on delete cascade
)
