package com.example.passwordgenerator.service.impl;

import com.example.passwordgenerator.dto.UserDto;
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
    public String loginUser(UserDto UserDto) {
        Optional<User> user = userRepository.findUserByEmail(UserDto.getEmail());

        if (user.isPresent() && user.get().getPasswordHash().equals(UserDto.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid email or password";
        }
    }

    @Override
    public String registerUser(UserDto UserDto) {
        Optional<User> existingUser = userRepository.findUserByEmail(UserDto.getEmail());
        if (existingUser.isPresent()) {
            return "User with this email already exists";
        }

        User user = new User();
        user.setUsername(UserDto.getUsername());
        user.setEmail(UserDto.getEmail());
        user.setPasswordHash(UserDto.getPassword());

        userRepository.save(user);
        return "User registered successfully";
    }

}
