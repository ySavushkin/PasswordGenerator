package com.example.passwordgenerator.service.impl;

import com.example.passwordgenerator.DTO.UserDTO;
import com.example.passwordgenerator.domain.entity.User;
import com.example.passwordgenerator.repository.UserRepository;
import com.example.passwordgenerator.service.LoginService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final UserRepository userRepository;

    @Override
    public String loginUser(UserDTO userDTO) {
        Optional<User> user = userRepository.findUserByEmail(userDTO.getEmail());

        if (user.isPresent() && user.get().getPasswordHash().equals(userDTO.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid email or password";
        }
    }

    @Override
    public String registerUser(UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findUserByEmail(userDTO.getEmail());
        if (existingUser.isPresent()) {
            return "User with this email already exists";
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPasswordHash(userDTO.getPassword());

        userRepository.save(user);
        return "User registered successfully";
    }
}
