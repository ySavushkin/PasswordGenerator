package com.example.passwordgenerator.service;

import com.example.passwordgenerator.domain.entity.User;

import java.util.Optional;

public interface UserService {

    Optional<User> findUserById(Long id);

    void deleteUser(Long id);

    User saveUser(User user);

}
