package com.example.passwordgenerator.repository;

import com.example.passwordgenerator.domain.entity.Password;
import com.example.passwordgenerator.domain.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class PasswordRepositoryTest {

    @Autowired
    private PasswordRepository passwordRepository;

    @Autowired
    private UserRepository userRepository; // Якщо паролі мають зовнішній ключ на User

    @Test
    void whenSavingPassword_thenCanRetrieveIt() {
        // Створення нового користувача
        User user = new User(null, "testuser", "test@example.com", "hashedPassword", LocalDateTime.now(), null);
        user = userRepository.save(user);  // Збереження користувача в базу

        // Створення паролю для цього користувача
        Password password = new Password(null, user, "hashedPassword123", "someService", LocalDateTime.now());
        password = passwordRepository.save(password);  // Збереження паролю в базу

        // Перевірка, що пароль був збережений в базі
        List<Password> allPasswords = passwordRepository.findAll();

        // Перевірка наявності одного паролю в базі даних
        assertThat(allPasswords).hasSize(1);
        assertThat(allPasswords.get(0).getPasswordHash()).isEqualTo("hashedPassword123");
        assertThat(allPasswords.get(0).getUser().getUsername()).isEqualTo("testuser");
    }

    @Test
    void whenDeletingPassword_thenItIsRemoved() {
        User user = new User(null, "testuser", "test@example.com", "hashedPassword", LocalDateTime.now(), null);
        user = userRepository.save(user);

        Password password = new Password(null, user, "hashedPassword123", "someService", LocalDateTime.now());
        password = passwordRepository.save(password);

        passwordRepository.delete(password); // Видалення паролю

        List<Password> allPasswords = passwordRepository.findAll();

        // Перевірка, що після видалення паролю його немає в базі
        assertThat(allPasswords).isEmpty();
    }
}
