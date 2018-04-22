DROP DATABASE IF EXISTS autism_app;
CREATE DATABASE autism_app;
USE autism_app;


CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    age int(6) NOT NULL,
    creation_date DATE NOT NULL,
    user_type TINYINT NOT NULL,#0 = learner, 1 = teacher
    teacher_id int(11),
    password BINARY(60) NOT NULL,

    PRIMARY KEY(id),
    UNIQUE(name),
    CONSTRAINT `teacher_id_users_fk` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS questions(
    id int(11) NOT NULL AUTO_INCREMENT,
    question_text TEXT NOT NULL,

    PRIMARY KEY(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

#answer to the question
CREATE TABLE IF NOT EXISTS questions_answers(
    id int(11) NOT NULL AUTO_INCREMENT,
    question_id int(11) NOT NULL,
    is_right TINYINT NOT NULL,#boolean value 
    content TEXT,#url of photo or something

    PRIMARY KEY(id),
    CONSTRAINT `question_id_questions_answers_fk` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

#answer the users gave
CREATE TABLE IF NOT EXISTS user_answers(
    id int(11) NOT NULL AUTO_INCREMENT,
    question_id int(11) NOT NULL,
    answer_id int(11) NOT NULL,
    user_id int(11) NOT NULL,
    creation_date DATETIME NOT NULL,

    PRIMARY KEY(id),
    CONSTRAINT `question_id_user_answer_fk` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
    CONSTRAINT `answer_id_user_answer_fk` FOREIGN KEY (`answer_id`) REFERENCES `questions_answers` (`id`),
    CONSTRAINT `user_id_user_answer_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS notes(
    id int(11) NOT NULL AUTO_INCREMENT,
    teacher_id int(11) NOT NULL,
    student_id int(11) NOT NULL,
    note text NOT NULL,

    PRIMARY KEY(id),
    CONSTRAINT `teacher_id_notes_fk` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`),
    CONSTRAINT `student_id_notes_fk` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

/* CREATE TABLE IF NOT EXISTS achievements(
    id int(11) NOT NULL AUTO_INCREMENT,
    user_id int(11) NOT NULL,

) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; */