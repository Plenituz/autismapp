INSERT INTO users (name, email, password, creation_date, user_type)
VALUES (@name, @email, @password, NOW(), @userType);

SELECT LAST_INSERT_ID() as created_user_id