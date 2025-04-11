--liquibase formatted sql

--changeset olashchenko:01
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       password_hash TEXT NOT NULL,  -- Додано поле для зберігання хешу пароля
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Дата та час створення
);

DROP TABLE IF EXISTS passwords;

CREATE TABLE passwords (
                           id SERIAL PRIMARY KEY,
                           user_id INT NOT NULL,
                           password_hash TEXT NOT NULL,  -- Хеш пароля
                           source VARCHAR(255) NOT NULL, -- Призначення пароля
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

