package com.example.passwordgenerator.service.impl;

import com.example.passwordgenerator.domain.entity.CharOptions;
import com.example.passwordgenerator.service.PasswordGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PasswordGeneratorServiceImpl implements PasswordGeneratorService {
    private static final SecureRandom random = new SecureRandom();

    private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String NUMBERS = "0123456789";
    private static final String SYMBOLS = "!@#$%^&*()_-+=<>?/";

    @Override
    public String generate(int length, int keys) {
        if (length <= 0 || keys == CharOptions.NONE) {
            throw new IllegalArgumentException("Invalid length or keys");
        }

        StringBuilder pool = new StringBuilder();

        if ((keys & CharOptions.UPPERCASE) != 0) {
            pool.append(UPPER);
        }
        if ((keys & CharOptions.LOWERCASE) != 0) {
            pool.append(LOWER);
        }
        if ((keys & CharOptions.NUMBERS) != 0) {
            pool.append(NUMBERS);
        }
        if ((keys & CharOptions.SYMBOLS) != 0) {
            pool.append(SYMBOLS);
        }

        if (pool.isEmpty()) {
            throw new IllegalArgumentException("No character sets selected");
        }

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(pool.length());
            result.append(pool.charAt(index));
        }

        return result.toString();
    }
}
