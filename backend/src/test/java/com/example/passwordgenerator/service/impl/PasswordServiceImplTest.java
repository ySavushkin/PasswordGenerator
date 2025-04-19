//package com.example.passwordgenerator.service.impl;
//
//import com.example.passwordgenerator.domain.entity.Password;
//import com.example.passwordgenerator.repository.PasswordRepository;
//import com.example.passwordgenerator.service.PasswordService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.Optional;
//
//import static org.mockito.Mockito.*;
//import static org.assertj.core.api.Assertions.assertThat;
//
//@SpringBootTest
//class PasswordServiceImplTest {
//
//    @Mock
//    private PasswordRepository passwordRepository;  // Мок репозиторію
//
//    @InjectMocks
//    private PasswordServiceImpl passwordService;  // Мок сервісу
//
//    @Test
//    void whenSavePassword_thenPasswordIsSaved() {
//        Password password = new Password(null, null, "hashedPassword123", "someService", null);
//
//        when(passwordRepository.save(any(Password.class)))
//                .thenReturn(password);
//
//        Password savedPassword = passwordService.savePassword(password);
//
//        assertThat(savedPassword).isNotNull();
//        assertThat(savedPassword.getPasswordHash()).isEqualTo("hashedPassword123");
//        verify(passwordRepository, times(1)).save(password);
//    }
//
//    @Test
//    void whenFindPasswordById_thenReturnPassword() {
//        Password password = new Password(1L, null, "hashedPassword123", "someService", null);
//
//        when(passwordRepository.findById(1L))
//                .thenReturn(Optional.of(password));
//
//        Optional<Password> foundPassword = passwordService.findPasswordById(1L);
//
//        assertThat(foundPassword).isPresent();
//        assertThat(foundPassword.get().getPasswordHash()).isEqualTo("hashedPassword123");
//    }
//
//    @Test
//    void whenDeletePassword_thenPasswordIsDeleted() {
//        Long passwordId = 1L;
//
//        doNothing().when(passwordRepository).deleteById(passwordId);
//
//        passwordService.deletePassword(passwordId);
//
//        verify(passwordRepository, times(1)).deleteById(passwordId);
//    }
//}
