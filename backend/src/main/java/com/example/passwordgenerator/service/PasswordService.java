package com.example.passwordgenerator.service;

import com.example.passwordgenerator.entity.Password;

import java.util.Optional;

public interface PasswordService {
    Optional<Password> findPasswordById(Long id);

    void deletePassword(Long id);

    Password savePassword(Password password);
}
