INSERT INTO users (name, creation_date, user_type, age)
VALUES (@name, NOW(), @userType, @age);

SELECT LAST_INSERT_ID() as created_user_id