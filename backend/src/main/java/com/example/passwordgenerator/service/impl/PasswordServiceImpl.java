package com.example.passwordgenerator.service.impl;

import com.example.passwordgenerator.domain.entity.Password;
import com.example.passwordgenerator.repository.PasswordRepository;
import com.example.passwordgenerator.service.PasswordService;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class PasswordServiceImpl implements PasswordService {

    private final PasswordRepository passwordRepository;

    @Override
    public Optional<Password> findPasswordById(Long id) {
        return passwordRepository.findById(id);
    }

    @Override
    public void deletePassword(Long id) {
        passwordRepository.deleteById(id);
    }

    @Override
    public Password savePassword(Password password) {
        return passwordRepository.save(password);
    }

}
