CREATE TABLE [dbo].[Users](
	[Id] [nvarchar](128) NOT NULL CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED,
	[ConcurrencyStamp] varchar(max) null,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) null,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEndDateUtc] [datetime] NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
	[NormalizedUserName] nvarchar(256) null,
	[LockoutEnd] datetimeoffset null
)