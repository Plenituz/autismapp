USE autism_app;

INSERT INTO questions (id, question_text)
VALUES
(1, 'Who looks sad?'),
(2, 'Who looks happy?'),
(3, 'Who looks angry?');

INSERT INTO questions_answers (question_id, is_right, content)
VALUES
(1, 1, '/assets/sad1.jpg'),
(1, 0, '/assets/happy1.jpg'),
(1, 0, '/assets/angry1.jpg'),

(2, 0, '/assets/angry2.jpg'),
(2, 1, '/assets/happy2.jpg'),
(2, 0, '/assets/sad2.jpg'),

(3, 0, '/assets/sad3.jpg'),
(3, 1, '/assets/angry3.jpg'),
(3, 0, '/assets/happy3.jpg');

INSERT INTO users (id, name, password, age, creation_date, user_type, teacher_id)
VALUES
(1, 'teacher1', 'dsf', 35, NOW(), 1, NULL),
(2, 'student1', 'dsf', 12, NOW(), 0, 1),
(3, 'student2', 'dsf', 14, NOW(), 0, 1);

INSERT INTO notes (teacher_id, student_id, note)
VALUES
(1, 2, 'this guy is pretty cool'),
(1, 2, 'last monday he ate ice cream');