package com.example.passwordgenerator.service;

import com.example.passwordgenerator.domain.entity.Password;
import com.example.passwordgenerator.domain.entity.User;

import java.util.List;
import java.util.Optional;

public interface PasswordService {

    Optional<Password> findPasswordById(Long id);

    void deletePassword(Long id);

    Password savePassword(Password password);

    List<Password> getPasswordsByUser(User user);

}
