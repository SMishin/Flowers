CREATE TABLE [dbo].[UserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL CONSTRAINT [PK_UserClaims] PRIMARY KEY CLUSTERED,
	[UserId] [nvarchar](128) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,

	CONSTRAINT [FK_dbo.UserClaims_Users_UserId] FOREIGN KEY([UserId]) REFERENCES [dbo].[Users] ([Id])
)