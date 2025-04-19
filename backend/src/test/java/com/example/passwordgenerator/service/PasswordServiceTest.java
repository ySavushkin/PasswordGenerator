//package com.example.passwordgenerator.service;
//
//import com.example.passwordgenerator.domain.entity.Password;
//import com.example.passwordgenerator.repository.PasswordRepository;
//import com.example.passwordgenerator.service.impl.PasswordServiceImpl;
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
//class PasswordServiceTest {
//
//    @Mock
//    private PasswordRepository passwordRepository;  // Мок репозиторію
//
//    @InjectMocks
//    private PasswordServiceImpl passwordService;  // Мок сервісу
//
//    private Password password;
//
//    @BeforeEach
//    void setUp() {
//        password = new Password(null, null, "hashedPassword123", "someService", null);
//    }
//
//    @Test
//    void whenSavePassword_thenPasswordIsSaved() {
//        // Arrange: мокуємо метод save, щоб він повертав той самий об'єкт
//        when(passwordRepository.save(password)).thenReturn(password);
//
//        // Act: викликаємо метод savePassword
//        Password savedPassword = passwordService.savePassword(password);
//
//        // Assert: перевіряємо, що повернутий об'єкт є тим самим, що і переданий
//        assertThat(savedPassword).isEqualTo(password);
//
//        // Перевіряємо, що метод save був викликаний один раз
//        verify(passwordRepository, times(1)).save(password);
//    }
//
//    @Test
//    void whenFindPasswordById_thenReturnPassword() {
//        // Arrange: мокуємо метод findById, щоб він повертав Optional з паролем
//        when(passwordRepository.findById(1L)).thenReturn(Optional.of(password));
//
//        // Act: викликаємо метод findPasswordById
//        Optional<Password> foundPassword = passwordService.findPasswordById(1L);
//
//        // Assert: перевіряємо, що пароль знайдений
//        assertThat(foundPassword).isPresent();
//        assertThat(foundPassword.get()).isEqualTo(password);
//
//        // Перевіряємо, що метод findById був викликаний один раз
//        verify(passwordRepository, times(1)).findById(1L);
//    }
//
//    @Test
//    void whenDeletePassword_thenPasswordIsDeleted() {
//        // Act: викликаємо метод deletePassword
//        passwordService.deletePassword(1L);
//
//        // Assert: перевіряємо, що метод deleteById був викликаний один раз
//        verify(passwordRepository, times(1)).deleteById(1L);
//    }
//}
