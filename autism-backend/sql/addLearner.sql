INSERT INTO users (name, creation_date, user_type, age, teacher_id)
VALUES (@name, NOW(), @userType, @age, @teacherId);

SELECT LAST_INSERT_ID() as created_user_id