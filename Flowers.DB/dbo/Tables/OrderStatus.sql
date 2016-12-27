CREATE TABLE [dbo].[OrderStatus]
(
	[Id] INT NOT NULL PRIMARY KEY identity(1,1),
	[Code] uniqueidentifier not null constraint [DF_OrderStatus_Code] default ('00000000-0000-0000-0000-000000000000'),																
	[Name] nvarchar(100) not null
)
