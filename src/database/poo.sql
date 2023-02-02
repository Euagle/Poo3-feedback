-- Active: 1675128331797@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PK UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL 
);

INSERT INTO users(id, name, email, password)
VALUES("a001", "Gleice", "gleice@gmail.com", "gleice123"),
("a002", "Marllon", "garllon@gmail.com", "marllon123"),
("a003", "Bruno", "bruno@gmail.com", "bruno123");

SELECT * FROM users; 