package com.example.passwordgenerator.repository;

import com.example.passwordgenerator.domain.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void whenSavingUser_thenCanRetrieveByEmail() {
        // Створення нового користувача
        User user = new User(null, "testuser", "test@example.com", "hashedPassword", LocalDateTime.now(), null);
        user = userRepository.save(user);  // Збереження користувача в базу

        // Пошук користувача за email
        Optional<User> foundUser = userRepository.findUserByEmail("test@example.com");

        // Перевірка, що користувач був знайдений
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getUsername()).isEqualTo("testuser");
        assertThat(foundUser.get().getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void whenUserNotFoundByEmail_thenReturnEmpty() {
        // Пошук неіснуючого користувача за email
        Optional<User> foundUser = userRepository.findUserByEmail("nonexistent@example.com");

        // Перевірка, що користувач не знайдений
        assertThat(foundUser).isNotPresent();
    }

    @Test
    void whenDeletingUser_thenUserIsRemoved() {
        // Створення нового користувача
        User user = new User(null, "testuser", "test@example.com", "hashedPassword", LocalDateTime.now(), null);
        user = userRepository.save(user);  // Збереження користувача в базу

        // Видалення користувача
        userRepository.delete(user);

        // Перевірка, що користувач був видалений
        Optional<User> foundUser = userRepository.findUserByEmail("test@example.com");
        assertThat(foundUser).isNotPresent();
    }
}
