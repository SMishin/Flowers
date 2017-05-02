CREATE TABLE [dbo].[Roles](
	[Id] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	
	CONSTRAINT [PK_dbo.Roles] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)
)