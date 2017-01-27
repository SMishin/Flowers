CREATE TABLE [dbo].[DeliveryTypes]
(
	[Id] INT NOT NULL PRIMARY KEY identity(1,1),
	[Name] nvarchar(400) not null, 
    [Price] MONEY NULL,
	[Description] nvarchar(max) null
)
