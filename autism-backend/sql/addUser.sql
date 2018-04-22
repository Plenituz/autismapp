INSERT INTO users (name, email, creation_date, user_type)
VALUES (@name, @email, NOW(), @userType);

SELECT LAST_INSERT_ID() as created_user_id