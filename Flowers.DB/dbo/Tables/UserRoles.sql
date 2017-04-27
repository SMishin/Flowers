CREATE TABLE [dbo].[UserRoles](
	[UserId] [nvarchar](128) NOT NULL,
	[RoleId] [nvarchar](128) NOT NULL,
	
	CONSTRAINT [PK_UserRoles] PRIMARY KEY CLUSTERED 
	(
		[UserId] ASC,
		[RoleId] ASC
	),
	CONSTRAINT [FK_UserRoles_Roles_RoleId] FOREIGN KEY([RoleId]) REFERENCES [dbo].[Roles] ([Id]),
	CONSTRAINT [FK_UserRoles_Users_UserId] FOREIGN KEY([UserId]) REFERENCES [dbo].[Users] ([Id])
)