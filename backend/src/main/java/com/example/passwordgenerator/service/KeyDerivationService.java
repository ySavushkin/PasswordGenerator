package com.example.passwordgenerator.service;

import org.springframework.stereotype.Service;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.SecretKey;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class KeyDerivationService {

    private static final String KDF_ALGO = "PBKDF2WithHmacSHA256";
    private static final int KEY_LENGTH_BITS = 256;

    public String generateSaltBase64(int saltBytes) {
        byte[] salt = new byte[saltBytes];
        new SecureRandom().nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    public SecretKey deriveKey(char[] password, String saltBase64, int iterations) {
        try {
            byte[] salt = Base64.getDecoder().decode(saltBase64);
            PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, KEY_LENGTH_BITS);
            SecretKeyFactory skf = SecretKeyFactory.getInstance(KDF_ALGO);
            byte[] keyBytes = skf.generateSecret(spec).getEncoded();
            return new javax.crypto.spec.SecretKeySpec(keyBytes, "AES");
        } catch (Exception e) {
            throw new RuntimeException("KDF error", e);
        }
    }
}

