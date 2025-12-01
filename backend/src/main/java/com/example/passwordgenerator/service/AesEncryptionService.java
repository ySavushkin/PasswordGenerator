package com.example.passwordgenerator.service;

import org.springframework.stereotype.Service;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class AesEncryptionService {

    private static final String ALGO = "AES/GCM/NoPadding";
    private static final int GCM_TAG_LENGTH = 128;
    private static final int IV_LENGTH = 12;

    public EncryptedData encrypt(String plainText, SecretKey key) {
        try {
            byte[] iv = new byte[IV_LENGTH];
            new SecureRandom().nextBytes(iv);

            Cipher cipher = Cipher.getInstance(ALGO);
            GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
            cipher.init(Cipher.ENCRYPT_MODE, key, spec);

            byte[] cipherBytes = cipher.doFinal(plainText.getBytes());

            EncryptedData data = new EncryptedData();
            data.setCipherTextBase64(Base64.getEncoder().encodeToString(cipherBytes));
            data.setIvBase64(Base64.getEncoder().encodeToString(iv));
            return data;
        } catch (Exception e) {
            throw new RuntimeException("Encryption error", e);
        }
    }

    public String decrypt(String cipherBase64, String ivBase64, SecretKey key) {
        try {
            byte[] iv = Base64.getDecoder().decode(ivBase64);
            byte[] cipherBytes = Base64.getDecoder().decode(cipherBase64);

            Cipher cipher = Cipher.getInstance(ALGO);
            GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
            cipher.init(Cipher.DECRYPT_MODE, key, spec);

            byte[] plainBytes = cipher.doFinal(cipherBytes);
            return new String(plainBytes);
        } catch (Exception e) {
            throw new RuntimeException("Decryption error", e);
        }
    }

    public static class EncryptedData {
        private String cipherTextBase64;
        private String ivBase64;

        public String getCipherTextBase64() {
            return cipherTextBase64;
        }

        public void setCipherTextBase64(String cipherTextBase64) {
            this.cipherTextBase64 = cipherTextBase64;
        }

        public String getIvBase64() {
            return ivBase64;
        }

        public void setIvBase64(String ivBase64) {
            this.ivBase64 = ivBase64;
        }
    }
}

