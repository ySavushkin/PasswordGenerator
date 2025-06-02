package com.example.passwordgenerator.utils;

import org.springframework.stereotype.Component;

@Component
public class PasswordUtils {
    public static int evaluatePasswordStrength(String password) {
        if (password == null || password.isEmpty()) {
            return 1;
        }

        int length = password.length();
        boolean hasLower = password.matches(".*[a-z].*");
        boolean hasUpper = password.matches(".*[A-Z].*");
        boolean hasDigit = password.matches(".*\\d.*");
        boolean hasSpecial = password.matches(".*[^a-zA-Z0-9].*");

        int types = 0;
        if (hasLower) types++;
        if (hasUpper) types++;
        if (hasDigit) types++;
        if (hasSpecial) types++;

        int score = 0;

        if (length >= 18) score += 40;
        else if (length >= 14) score += 35;
        else if (length >= 12) score += 30;
        else if (length >= 10) score += 20;
        else if (length >= 8) score += 10;
        else score += 5;

        switch (types) {
            case 4: score += 40; break;
            case 3: score += 25; break;
            case 2: score += 15; break;
            case 1: score += 5; break;
            default: score += 0;
        }

        if (length >= 16 && types == 4) score += 15;
        else if (length >= 12 && types == 4) score += 10;
        else if (length >= 10 && types >= 3) score += 5;

        if (length >= 20 && types == 4) score += 5;

        if (length < 8 && types < 3) score -= 10;
        if (length < 6) score -= 20;

        return Math.max(1, Math.min(100, score));
    }
}
