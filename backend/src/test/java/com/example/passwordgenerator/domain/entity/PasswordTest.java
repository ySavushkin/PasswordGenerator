package com.example.passwordgenerator.domain.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

class PasswordTest {

    // Тест для конструктора без параметрів
    @Test
    void constructor_WhenCalledWithReflection_ThenInstanceCreated() {
        assertThatCode(() -> Password.class.getDeclaredConstructor().newInstance())
                .doesNotThrowAnyException();
    }

    // Тест для конструктора з параметрами
    @Test
    void constructor_WhenCalledWithParameters_ThenInstanceCreated() {
        User user = new User(1L, "testUser", "test@example.com", "hashedPassword", LocalDateTime.now(), null);
        Password password = new Password(1L, user, "hashedPassword123", "someService", LocalDateTime.now());

        assertThat(password.getId()).isEqualTo(1L);
        assertThat(password.getUser()).isEqualTo(user);
        assertThat(password.getPasswordHash()).isEqualTo("hashedPassword123");
        assertThat(password.getSource()).isEqualTo("someService");
        assertThat(password.getCreatedAt()).isBeforeOrEqualTo(LocalDateTime.now());
    }
}
