CREATE TABLE [dbo].[Order]
(
	[Id]		INT NOT NULL PRIMARY KEY identity(1,1),
	[OrderStatusId]	int not null,
	[ShippingDetailsId] int not null,
	[DateTime]	datetime not null constraint [DF_Order_DateTime] default (getdate()),
	constraint [FK_Order_OrderStatusId] foreign key ([OrderStatusId]) references [OrderStatus]([Id]),
	constraint [FK_Order_ShippingDetailsId] foreign key ([ShippingDetailsId]) references [ShippingDetails]([Id])on delete cascade

)
