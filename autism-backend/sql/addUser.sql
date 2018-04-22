INSERT INTO users (name, password, creation_date, user_type, age)
VALUES (@name, @password, NOW(), @userType, @age);

SELECT LAST_INSERT_ID() as created_user_id