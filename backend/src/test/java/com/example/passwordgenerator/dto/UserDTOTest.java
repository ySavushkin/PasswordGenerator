package com.example.passwordgenerator.dto;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.validation.*;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class UserDtoTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void whenAllFieldsValid_thenNoViolations() {
        UserDto UserDto = new UserDto("testuser", "test@example.com", "securePassword");

        Set<ConstraintViolation<UserDto>> violations = validator.validate(UserDto);

        assertThat(violations).isEmpty();
    }

    @Test
    void whenFieldsAreInvalid_thenViolationsOccur() {
        UserDto UserDto = new UserDto("", "invalid-email", "");

        Set<ConstraintViolation<UserDto>> violations = validator.validate(UserDto);

        assertThat(violations).hasSize(3);

        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("username"));
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("email"));
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("password"));
    }

    @Test
    void getterAndSetter_ShouldWorkCorrectly() {
        UserDto UserDto = new UserDto();

        UserDto.setUsername("testuser");
        UserDto.setEmail("test@example.com");
        UserDto.setPassword("securePassword");

        assertThat(UserDto.getUsername()).isEqualTo("testuser");
        assertThat(UserDto.getEmail()).isEqualTo("test@example.com");
        assertThat(UserDto.getPassword()).isEqualTo("securePassword");
    }
}
