INSERT INTO user_answers (question_id, answer_id, user_id, creation_date, is_right)
VALUES (@questionId, @answerId, @userId, NOW(), @isRight);