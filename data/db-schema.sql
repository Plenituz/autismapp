DROP DATABASE IF EXISTS autism_app;
CREATE DATABASE autism_app;
USE autism_app;


CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(254) NOT NULL,
    creation_date DATE NOT NULL,
    user_type TINYINT NOT NULL,#0 = learner, 1 = teacher

    PRIMARY KEY(id),
    UNIQUE KEY ind_uni_email(email)
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

    PRIMARY KEY(id),
    CONSTRAINT `question_id_user_answer_fk` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
    CONSTRAINT `answer_id_user_answer_fk` FOREIGN KEY (`answer_id`) REFERENCES `questions_answers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
