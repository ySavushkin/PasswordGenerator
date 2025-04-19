//package com.example.passwordgenerator.service;
//
//import com.example.passwordgenerator.domain.entity.User;
//import com.example.passwordgenerator.repository.UserRepository;
//import com.example.passwordgenerator.service.impl.UserServiceImpl;
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
//class UserServiceTest {
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
//        user = new User(null, "testuser", "test@example.com", "hashedPassword123", null, null);
//    }
//
//    @Test
//    void whenSaveUser_thenUserIsSaved() {
//        // Arrange: мокуємо метод save, щоб він повертав той самий об'єкт
//        when(userRepository.save(user)).thenReturn(user);
//
//        // Act: викликаємо метод saveUser
//        User savedUser = userService.saveUser(user);
//
//        // Assert: перевіряємо, що повернутий об'єкт є тим самим, що і переданий
//        assertThat(savedUser).isEqualTo(user);
//
//        // Перевіряємо, що метод save був викликаний один раз
//        verify(userRepository, times(1)).save(user);
//    }
//
//    @Test
//    void whenFindUserById_thenReturnUser() {
//        // Arrange: мокуємо метод findById, щоб він повертав Optional з користувачем
//        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
//
//        // Act: викликаємо метод findUserById
//        Optional<User> foundUser = userService.findUserById(1L);
//
//        // Assert: перевіряємо, що користувач знайдений
//        assertThat(foundUser).isPresent();
//        assertThat(foundUser.get()).isEqualTo(user);
//
//        // Перевіряємо, що метод findById був викликаний один раз
//        verify(userRepository, times(1)).findById(1L);
//    }
//
//    @Test
//    void whenDeleteUser_thenUserIsDeleted() {
//        // Act: викликаємо метод deleteUser
//        userService.deleteUser(1L);
//
//        // Assert: перевіряємо, що метод deleteById був викликаний один раз
//        verify(userRepository, times(1)).deleteById(1L);
//    }
//}
