
if(not exists (select null from [dbo].Users where Id = '21302f78-721f-428d-bd9b-e26f7fcc3f79'))
begin

	INSERT INTO [dbo].[Users]
			   ([Id]
			   ,[Email]
			   ,[EmailConfirmed]
			   ,[PasswordHash]
			   ,[SecurityStamp]
			   ,[PhoneNumber]
			   ,[PhoneNumberConfirmed]
			   ,[TwoFactorEnabled]
			   ,[LockoutEndDateUtc]
			   ,[LockoutEnabled]
			   ,[AccessFailedCount]
			   ,[UserName]
			   ,[NormalizedUserName])
		 VALUES
			   ('21302f78-721f-428d-bd9b-e26f7fcc3f79'
			   ,'admin@admin.ru'
			   ,0
			   ,'AMQNEBRox6n8M1pwlBYaHZfKbrSDrIg/H+dzdOOJ8wcISwQc2ibsokq+VHCMauicDg==' -- zYHU=#&^8++p8bmV
			   ,'40a9ecc9-9934-46af-b4c4-413776c0c2f2'
			   ,null
			   ,0
			   ,0
			   ,null
			   ,1
			   ,0
			   ,'admin@admin.ru',
			   'ADMIN@ADMIN.RU'
			   )
end
else
	begin
		update [dbo].[Users]
			   set
			   [Email] = 'admin@admin.ru'
			   ,[EmailConfirmed] = 0
			   ,[PasswordHash] = 'AMQNEBRox6n8M1pwlBYaHZfKbrSDrIg/H+dzdOOJ8wcISwQc2ibsokq+VHCMauicDg=='
			   ,[SecurityStamp] = '40a9ecc9-9934-46af-b4c4-413776c0c2f2'
			   ,[PhoneNumber] = null
			   ,[PhoneNumberConfirmed] = 0
			   ,[TwoFactorEnabled]=0
			   ,[LockoutEndDateUtc]=null
			   ,[LockoutEnabled]=1
			   ,[AccessFailedCount] =0 
			   ,[UserName] = 'admin@admin.ru'
			   ,[NormalizedUserName] ='ADMIN@ADMIN.RU'
	
			   where id= '21302f78-721f-428d-bd9b-e26f7fcc3f79'
end



