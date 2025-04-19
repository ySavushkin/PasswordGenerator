package com.example.passwordgenerator.DTO;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.validation.*;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class UserDTOTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void whenAllFieldsValid_thenNoViolations() {
        UserDTO userDTO = new UserDTO("testuser", "test@example.com", "securePassword");

        Set<ConstraintViolation<UserDTO>> violations = validator.validate(userDTO);

        assertThat(violations).isEmpty();
    }

    @Test
    void whenFieldsAreInvalid_thenViolationsOccur() {
        UserDTO userDTO = new UserDTO("", "invalid-email", "");

        Set<ConstraintViolation<UserDTO>> violations = validator.validate(userDTO);

        assertThat(violations).hasSize(3);

        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("username"));
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("email"));
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("password"));
    }

    @Test
    void getterAndSetter_ShouldWorkCorrectly() {
        UserDTO userDTO = new UserDTO();

        userDTO.setUsername("testuser");
        userDTO.setEmail("test@example.com");
        userDTO.setPassword("securePassword");

        assertThat(userDTO.getUsername()).isEqualTo("testuser");
        assertThat(userDTO.getEmail()).isEqualTo("test@example.com");
        assertThat(userDTO.getPassword()).isEqualTo("securePassword");
    }
}
