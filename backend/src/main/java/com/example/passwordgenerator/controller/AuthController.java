package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.DTO.UserDTO;
import com.example.passwordgenerator.entity.User;
import com.example.passwordgenerator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private UserRepository userRepository;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public String register(@RequestBody UserDTO userDTO) {
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

    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO) {
        Optional<User> user = userRepository.findUserByEmail(userDTO.getEmail());

        if (user.isPresent() && user.get().getPasswordHash().equals(userDTO.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid email or password";
        }
    }
}
