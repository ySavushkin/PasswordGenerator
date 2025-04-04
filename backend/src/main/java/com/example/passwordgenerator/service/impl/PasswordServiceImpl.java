package com.example.passwordgenerator.service.impl;

import com.example.passwordgenerator.entity.Password;
import com.example.passwordgenerator.repository.PasswordRepository;
import com.example.passwordgenerator.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PasswordServiceImpl implements PasswordService {

    public PasswordRepository passwordRepository;

    @Autowired
    public PasswordServiceImpl(PasswordRepository passwordRepository){
        this.passwordRepository = passwordRepository;
    }
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
