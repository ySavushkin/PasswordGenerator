package com.example.passwordgenerator.service;

import com.example.passwordgenerator.DTO.UserDTO;
import com.example.passwordgenerator.domain.entity.User;
import com.example.passwordgenerator.repository.UserRepository;
import com.example.passwordgenerator.service.impl.LoginServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LoginServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private LoginServiceImpl loginService;

    @Test
    void testLoginUserSuccessfulLogin() {

        User user = new User(1L, "Test", "test@test.com", "test");
        UserDTO userDTO = new UserDTO("Test", "test@test.com", "test");

        when(userRepository.findUserByEmail("test@test.com")).thenReturn(Optional.of(user));

        assertEquals("Login successful", loginService.loginUser(userDTO));
    }

    @Test
    void testLoginUserUserNotFound() {
        UserDTO userDTO = new UserDTO("Test", "invalid@test.com", "test");

        when(userRepository.findUserByEmail("invalid@test.com")).thenReturn(Optional.empty());

        assertEquals("Invalid email or password", loginService.loginUser(userDTO));
    }

    @Test
    void testLoginUserInvalidPassword() {

        User user = new User(1L, "Test", "test@test.com", "test");
        UserDTO userDTO = new UserDTO("Test", "test@test.com", "invalid");

        when(userRepository.findUserByEmail("test@test.com")).thenReturn(Optional.of(user));

        assertEquals("Invalid email or password", loginService.loginUser(userDTO));
    }

    @Test
    void testRegisterUserSuccess() {
        UserDTO userDTO = new UserDTO("test", "test@test.com", "test");

        when(userRepository.findUserByEmail("test@test.com")).thenReturn(Optional.empty());

        String result = loginService.registerUser(userDTO);

        verify(userRepository, times(1)).save(any(User.class));
        assertEquals("User registered successfully", result);
    }

    @Test
    void testRegisterUserEmailAlreadyExists() {
        UserDTO userDTO = new UserDTO("test", "test@test.com", "test");
        User existingUser = new User();
        existingUser.setEmail("test@test.com");

        when(userRepository.findUserByEmail("test@test.com")).thenReturn(Optional.of(existingUser));

        String result = loginService.registerUser(userDTO);

        verify(userRepository, never()).save(any(User.class));
        assertEquals("User with this email already exists", result);
    }
}
