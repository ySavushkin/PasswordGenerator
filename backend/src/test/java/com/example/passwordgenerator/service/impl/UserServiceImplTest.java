//package com.example.passwordgenerator.service.impl;
//
//import com.example.passwordgenerator.domain.entity.User;
//import com.example.passwordgenerator.repository.UserRepository;
//import com.example.passwordgenerator.service.UserService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import static org.mockito.Mockito.*;
//import static org.assertj.core.api.Assertions.assertThat;
//
//import java.util.Optional;
//
//class UserServiceImplTest {
//
//    @Mock
//    private UserRepository userRepository;  // Мок репозиторію
//
//    @InjectMocks
//    private UserServiceImpl userService;  // Мок сервісу
//
//    private User user;
//
//    @BeforeEach
//    void setUp() {
//        user = new User(null, "testuser", "test@example.com", "hashedPassword", null, null);
//    }
//
//    @Test
//    void whenSaveUser_thenUserIsSaved() {
//        // Arrange: визначити поведінку мокованого репозиторію
//        when(userRepository.save(any(User.class))).thenReturn(user);
//
//        // Act: викликаємо метод збереження
//        User savedUser = userService.saveUser(user);
//
//        // Assert: перевіряємо, що збережений користувач має правильні значення
//        assertThat(savedUser).isNotNull();
//        assertThat(savedUser.getUsername()).isEqualTo("testuser");
//        assertThat(savedUser.getEmail()).isEqualTo("test@example.com");
//
//        // Перевіряємо, що метод save був викликаний один раз
//        verify(userRepository, times(1)).save(user);
//    }
//
//    @Test
//    void whenFindUserById_thenReturnUser() {
//        // Arrange: визначити поведінку мокованого репозиторію
//        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
//
//        // Act: викликаємо метод пошуку
//        Optional<User> foundUser = userService.findUserById(1L);
//
//        // Assert: перевіряємо, що знайдений користувач відповідає очікуванням
//        assertThat(foundUser).isPresent();
//        assertThat(foundUser.get().getUsername()).isEqualTo("testuser");
//
//        // Перевіряємо, що метод findById був викликаний один раз
//        verify(userRepository, times(1)).findById(1L);
//    }
//
//    @Test
//    void whenDeleteUser_thenUserIsDeleted() {
//        // Arrange: підготувати мок для deleteById
//        doNothing().when(userRepository).deleteById(1L);
//
//        // Act: викликаємо метод видалення
//        userService.deleteUser(1L);
//
//        // Assert: перевіряємо, що метод deleteById був викликаний один раз
//        verify(userRepository, times(1)).deleteById(1L);
//    }
//}
