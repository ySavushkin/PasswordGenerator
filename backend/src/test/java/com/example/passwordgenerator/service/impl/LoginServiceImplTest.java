//package com.example.passwordgenerator.service.impl;
//
//import com.example.passwordgenerator.DTO.UserDTO;
//import com.example.passwordgenerator.domain.entity.User;
//import com.example.passwordgenerator.repository.UserRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Optional;
//
//import static org.mockito.Mockito.*;
//import static org.junit.jupiter.api.Assertions.*;
//
//class LoginServiceImplTest {
//
//    @Mock
//    private UserRepository userRepository;
//
//    @InjectMocks
//    private LoginServiceImpl loginService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void whenValidLogin_thenReturnsSuccess() {
//        // Створення тестового користувача
//        UserDTO userDTO = new UserDTO("testuser", "test@example.com", "password123");
//
//        // Мок користувача в репозиторії
//        User user = new User();
//        user.setEmail("test@example.com");
//        user.setPasswordHash("password123");
//
//        // Налаштування моків
//        when(userRepository.findUserByEmail("test@example.com")).thenReturn(Optional.of(user));
//
//        // Виклик методу
//        String result = loginService.loginUser(userDTO);
//
//        // Перевірка результату
//        assertEquals("Login successful", result);
//    }
//
//    @Test
//    void whenInvalidLogin_thenReturnsError() {
//        // Створення тестового користувача
//        UserDTO userDTO = new UserDTO("testuser", "test@example.com", "wrongpassword");
//
//        // Мок користувача в репозиторії
//        User user = new User();
//        user.setEmail("test@example.com");
//        user.setPasswordHash("password123");
//
//        // Налаштування моків
//        when(userRepository.findUserByEmail("test@example.com")).thenReturn(Optional.of(user));
//
//        // Виклик методу
//        String result = loginService.loginUser(userDTO);
//
//        // Перевірка результату
//        assertEquals("Invalid email or password", result);
//    }
//
//    @Test
//    void whenRegisteringNewUser_thenReturnsSuccess() {
//        // Створення тестового користувача
//        UserDTO userDTO = new UserDTO("newuser", "newuser@example.com", "newpassword");
//
//        // Налаштування моків
//        when(userRepository.findUserByEmail("newuser@example.com")).thenReturn(Optional.empty());
//
//        // Виклик методу
//        String result = loginService.registerUser(userDTO);
//
//        // Перевірка результату
//        assertEquals("User registered successfully", result);
//        verify(userRepository, times(1)).save(any(User.class));  // Перевірка, чи було викликано збереження користувача
//    }
//
//    @Test
//    void whenRegisteringExistingUser_thenReturnsError() {
//        // Створення тестового користувача
//        UserDTO userDTO = new UserDTO("existinguser", "existinguser@example.com", "password123");
//
//        // Мок користувача в репозиторії
//        User user = new User();
//        user.setEmail("existinguser@example.com");
//        user.setPasswordHash("password123");
//
//        // Налаштування моків
//        when(userRepository.findUserByEmail("existinguser@example.com")).thenReturn(Optional.of(user));
//
//        // Виклик методу
//        String result = loginService.registerUser(userDTO);
//
//        // Перевірка результату
//        assertEquals("User with this email already exists", result);
//        verify(userRepository, never()).save(any(User.class));  // Перевірка, що збереження не відбулося
//    }
//}
