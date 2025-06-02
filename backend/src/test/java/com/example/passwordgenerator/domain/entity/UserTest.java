package com.example.passwordgenerator.domain.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

class UserTest {

    // Тест для конструктора без параметрів
    @Test
    void constructor_WhenCalledWithReflection_ThenInstanceCreated() {
        assertThatCode(() -> User.class.getDeclaredConstructor().newInstance())
                .doesNotThrowAnyException();
    }

    // Тест для конструктора з параметрами
    @Test
    void constructor_WhenCalledWithParameters_ThenInstanceCreated() {
        User user = new User(1L, "testUser", "test@example.com", "hashedPassword", LocalDateTime.now(), null);

        assertThat(user.getId()).isEqualTo(1L);
        assertThat(user.getUsername()).isEqualTo("testUser");
        assertThat(user.getEmail()).isEqualTo("test@example.com");
        assertThat(user.getPasswordHash()).isEqualTo("hashedPassword");
        assertThat(user.getCreatedAt()).isBeforeOrEqualTo(LocalDateTime.now());
    }

    // Тест для зв'язку між користувачем та паролями
    @Test
    void whenUserHasPasswords_ThenPasswordsListIsNotNull() {
        User user = new User(1L, "testUser", "test@example.com", "hashedPassword", LocalDateTime.now(), null);
        Password password = new Password(1L, user, "hashedPassword123", "someService", LocalDateTime.now());

        user.setPasswords(List.of(password));

        assertThat(user.getPasswords()).isNotNull();
        assertThat(user.getPasswords()).hasSize(1);
        assertThat(user.getPasswords().get(0).getPasswordHash()).isEqualTo("hashedPassword123");
    }
}
