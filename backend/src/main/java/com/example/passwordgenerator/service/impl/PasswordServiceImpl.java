package com.example.passwordgenerator.service.impl;

import com.example.passwordgenerator.domain.entity.Password;
import com.example.passwordgenerator.domain.entity.User;
import com.example.passwordgenerator.repository.PasswordRepository;
import com.example.passwordgenerator.service.AesEncryptionService;
import com.example.passwordgenerator.service.KeyDerivationService;
import com.example.passwordgenerator.service.PasswordService;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PasswordServiceImpl implements PasswordService {

    private final PasswordRepository passwordRepository;
    private final KeyDerivationService keyDerivationService;
    private final AesEncryptionService aesEncryptionService;

    public Password savePassword(User user, String masterPassword, String plainPassword, String source) {
        SecretKey key = keyDerivationService.deriveKey(
                masterPassword.toCharArray(),
                user.getEncryptionSalt(),
                user.getKdfIterations()
        );

        AesEncryptionService.EncryptedData encrypted = aesEncryptionService.encrypt(plainPassword, key);

        Password p = new Password();
        p.setUser(user);
        p.setSource(source);
        p.setEncryptedPassword(encrypted.getCipherTextBase64());
        p.setIv(encrypted.getIvBase64());

        return passwordRepository.save(p);
    }

    public List<DecryptedPasswordDto> getPasswords(User user, String masterPassword) {
        SecretKey key = keyDerivationService.deriveKey(
                masterPassword.toCharArray(),
                user.getEncryptionSalt(),
                user.getKdfIterations()
        );

        List<Password> stored = passwordRepository.findByUser(user);

        return stored.stream()
                .map(p -> {
                    String decrypted = aesEncryptionService.decrypt(
                            p.getEncryptedPassword(),
                            p.getIv(),
                            key
                    );
                    return new DecryptedPasswordDto(
                            p.getId(),
                            p.getSource(),
                            decrypted,
                            p.getCreatedAt()
                    );
                })
                .collect(Collectors.toList());
    }

    @Getter @Setter
    public static class DecryptedPasswordDto {
        private Long id;
        private String source;
        private String password;
        private LocalDateTime createdAt;

        public DecryptedPasswordDto(Long id, String source, String password, LocalDateTime createdAt) {
            this.id = id;
            this.source = source;
            this.password = password;
            this.createdAt = createdAt;
        }
    }

}
