SELECT questions.id as question_id, questions.question_text, questions_answers.id as answer_id, questions_answers.is_right, questions_answers.content
FROM questions 
INNER JOIN questions_answers 
ON questions_answers.question_id = questions.id;