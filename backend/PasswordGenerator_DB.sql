-- Створення таблиці користувачів

DROP TABLE IF EXISTS users;

CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       password_hash TEXT NOT NULL,  -- Додано поле для зберігання хешу пароля
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Дата та час створення
);

-- Видалення старої таблиці паролів, якщо вона існувала
DROP TABLE IF EXISTS passwords;

-- Створення оновленої таблиці паролів
CREATE TABLE passwords (
                           id SERIAL PRIMARY KEY,
                           user_id INT NOT NULL,
                           password_hash TEXT NOT NULL,  -- Хеш пароля
                           source VARCHAR(255) NOT NULL, -- Призначення пароля
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Зовнішній ключ для зв'язку з таблицею users, видаляє паролі при видаленні користувача
                           CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
