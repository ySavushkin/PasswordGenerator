package com.example.passwordgenerator.service;

import com.example.passwordgenerator.domain.entity.Password;
import com.example.passwordgenerator.domain.entity.User;
import com.example.passwordgenerator.service.impl.PasswordServiceImpl;

import java.util.List;
import java.util.Optional;

public interface PasswordService {

    Password savePassword(User user, String masterPassword, String plainPassword, String source);

    List<PasswordServiceImpl.DecryptedPasswordDto> getPasswords(User user, String masterPassword);

}
