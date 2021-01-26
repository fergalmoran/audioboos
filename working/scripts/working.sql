SELECT "Id", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp", "PhoneNumber", "PhoneNumberConfirmed", "TwoFactorEnabled", "LockoutEnd", "LockoutEnabled", "AccessFailedCount"
FROM app."AppUsers";

select "PhysicalPath" from app."Album"




select * from app."AppUsers" 
delete from app."AppUsers" 

DROP SCHEMA app CASCADE;

DROP SCHEMA auth CASCADE;

DROP TABLE public."__EFMigrationsHistory";
