DROP DATABASE IF EXISTS autism_app;
CREATE DATABASE autism_app;
USE autism_app;


CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(254) NOT NULL,
    creation_date DATE NOT NULL,
    user_type TINYINT NOT NULL,

    PRIMARY KEY(id),
    UNIQUE KEY ind_uni_email(email)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

