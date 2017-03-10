CREATE TABLE [dbo].[Products]
(
	[Id]			INT NOT NULL PRIMARY KEY identity(1,1),
	[Type]			int not null constraint [DF_Products_Type] default (0),
	[Name]			nvarchar(500) not null,
	[Summary]		nvarchar(1000) null,
	[Description]	nvarchar(max) null, 
	[Price]			money null,
	[Published]		bit not null  constraint [DF_Products_Published] default (0),
)
