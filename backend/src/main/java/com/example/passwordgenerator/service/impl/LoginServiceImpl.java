package com.example.passwordgenerator.service.impl;

import com.example.passwordgenerator.dto.ResponseDto;
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
    public ResponseDto loginUser(UserDto userDto) {
        Optional<User> user = userRepository.findUserByEmail(userDto.getEmail());

        if (user.isPresent() && user.get().getPasswordHash().equals(userDto.getPassword())) {
            return new ResponseDto(true, "Login successful");
        } else {
            return new ResponseDto(false, "Bad request!");
        }
    }

    @Override
    public ResponseDto registerUser(UserDto userDto) {
        Optional<User> existingUser = userRepository.findUserByEmail(userDto.getEmail());
        if (existingUser.isPresent()) {
            return new ResponseDto(false, "User with this email already exists!");
        }

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPasswordHash(userDto.getPassword());

        userRepository.save(user);
        return new ResponseDto(true, "User registered successfully");
    }

}
