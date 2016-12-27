CREATE TABLE [dbo].[Person]
(
	[Id]			INT NOT NULL PRIMARY KEY identity(1,1),
	[FirstnName]	nvarchar(4000) not null,
	[LastName]		nvarchar(4000) not null,
	[MiddleName]	nvarchar(4000) not null,
	[Email]			nvarchar(4000) null,
	[Phone]			nvarchar(500) not null
)
