//package com.example.passwordgenerator.service;
//
//import com.example.passwordgenerator.DTO.UserDTO;
//import com.example.passwordgenerator.domain.entity.User;
//import com.example.passwordgenerator.repository.UserRepository;
//import com.example.passwordgenerator.service.impl.LoginServiceImpl;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//
//import static org.mockito.Mockito.*;
//import static org.assertj.core.api.Assertions.assertThat;
//
//import java.util.Optional;
//
//class LoginServiceTest {
//
//    @Mock
//    private UserRepository userRepository;  // Мок репозиторію
//
//    @InjectMocks
//    private LoginServiceImpl loginService;  // Мок сервісу
//
//    private UserDTO userDTO;
//    private User user;
//
//    @BeforeEach
//    void setUp() {
//        userDTO = new UserDTO("testuser", "test@example.com", "hashedPassword123");
//        user = new User(null, "testuser", "test@example.com", "hashedPassword123", null, null);
//    }
//
//    @Test
//    void whenLoginUser_thenReturnSuccess() {
//        // Arrange: мокуємо поведінку репозиторію для знаходження користувача за email
//        when(userRepository.findUserByEmail(userDTO.getEmail())).thenReturn(Optional.of(user));
//
//        // Act: викликаємо метод loginUser
//        String result = loginService.loginUser(userDTO);
//
//        // Assert: перевіряємо, що логін пройшов успішно
//        assertThat(result).isEqualTo("Login successful");
//
//        // Перевіряємо, що метод findUserByEmail був викликаний один раз
//        verify(userRepository, times(1)).findUserByEmail(userDTO.getEmail());
//    }
//
//    @Test
//    void whenLoginUserWithInvalidPassword_thenReturnFailure() {
//        // Arrange: мокуємо користувача з правильним email, але неправильним паролем
//        user.setPasswordHash("wrongPassword123");
//        when(userRepository.findUserByEmail(userDTO.getEmail())).thenReturn(Optional.of(user));
//
//        // Act: викликаємо метод loginUser
//        String result = loginService.loginUser(userDTO);
//
//        // Assert: перевіряємо, що логін не вдався через неправильний пароль
//        assertThat(result).isEqualTo("Invalid email or password");
//
//        // Перевіряємо, що метод findUserByEmail був викликаний один раз
//        verify(userRepository, times(1)).findUserByEmail(userDTO.getEmail());
//    }
//
//    @Test
//    void whenRegisterUser_thenReturnSuccess() {
//        // Arrange: мокуємо відсутність користувача в репозиторії
//        when(userRepository.findUserByEmail(userDTO.getEmail())).thenReturn(Optional.empty());
//
//        // Act: викликаємо метод registerUser
//        String result = loginService.registerUser(userDTO);
//
//        // Assert: перевіряємо, що реєстрація пройшла успішно
//        assertThat(result).isEqualTo("User registered successfully");
//
//        // Перевіряємо, що метод findUserByEmail був викликаний один раз
//        verify(userRepository, times(1)).findUserByEmail(userDTO.getEmail());
//        verify(userRepository, times(1)).save(any(User.class)); // Перевіряємо, що метод save був викликаний для збереження користувача
//    }
//
//    @Test
//    void whenRegisterUserWithExistingEmail_thenReturnFailure() {
//        // Arrange: мокуємо наявність користувача з таким email в репозиторії
//        when(userRepository.findUserByEmail(userDTO.getEmail())).thenReturn(Optional.of(user));
//
//        // Act: викликаємо метод registerUser
//        String result = loginService.registerUser(userDTO);
//
//        // Assert: перевіряємо, що реєстрація не вдалась через наявність користувача з таким email
//        assertThat(result).isEqualTo("User with this email already exists");
//
//        // Перевіряємо, що метод findUserByEmail був викликаний один раз
//        verify(userRepository, times(1)).findUserByEmail(userDTO.getEmail());
//    }
//}
