CREATE TABLE [dbo].[Person]
(
	[Id]			INT NOT NULL PRIMARY KEY identity(1,1),
	[FirstName]	nvarchar(4000) not null,
	[MiddleName]	nvarchar(4000) null,
	[LastName]		nvarchar(4000) null,
	[Email]			nvarchar(4000) not null,
	[Phone]			nvarchar(500) not null
)
