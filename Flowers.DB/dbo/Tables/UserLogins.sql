CREATE TABLE [dbo].[UserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	
	CONSTRAINT [PK_UserLogins] PRIMARY KEY CLUSTERED 
	(
		[LoginProvider] ASC,
		[ProviderKey] ASC,
		[UserId] ASC
	),
	CONSTRAINT [FK_UserLogins_Users_UserId] FOREIGN KEY([UserId]) REFERENCES [dbo].[Users] ([Id])
)