
declare @FlowersType table(
	[Id]	INT NOT NULL PRIMARY KEY,
	[Name]	nvarchar(100) not null
)

INSERT @FlowersType ([Id], [Name]) 
VALUES   (0, N'Розы')
		,(1, N'Хризантемы')
		,(2, N'Альстромерия')
		,(3, N'Гвоздика')
		,(4, N'Ирис')
		,(6, N'Гербера')
		,(7, N'Лилия')
		,(8, N'Подсолнух')
		,(9, N'Тюльпан')
		,(10, N'Фрезия')
		,(11, N'Эустома')
		,(12, N'Пион')
		,(13, N'Калла')

SET IDENTITY_INSERT [dbo].[FlowersType] ON

MERGE [dbo].[FlowersType] AS target  
USING @FlowersType AS source ON (target.Id = source.Id)  
WHEN MATCHED
    THEN update set [Name] = source.[Name]
WHEN not MATCHED   
    THEN insert (Id,[Name]) 
	values (source.Id, source.[Name])
	;

SET IDENTITY_INSERT [dbo].[FlowersType] OFF
