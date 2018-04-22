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
