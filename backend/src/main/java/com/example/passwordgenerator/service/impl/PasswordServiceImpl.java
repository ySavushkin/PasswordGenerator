package com.example.passwordgenerator.service.impl;

import com.example.passwordgenerator.domain.entity.Password;
import com.example.passwordgenerator.domain.entity.User;
import com.example.passwordgenerator.repository.PasswordRepository;
import com.example.passwordgenerator.service.PasswordService;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PasswordServiceImpl implements PasswordService {

    private final PasswordRepository passwordRepository;

    @Override
    public Password savePassword(Password password) {
        return passwordRepository.save(password);
    }

    @Override
    public List<Password> getPasswordsByUser(User user) { return passwordRepository.findByUser(user); }

}
