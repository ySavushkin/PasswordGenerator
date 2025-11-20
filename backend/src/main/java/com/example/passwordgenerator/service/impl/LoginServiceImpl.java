package com.example.passwordgenerator.service.impl;

import com.example.passwordgenerator.dto.ResponseDto;
import com.example.passwordgenerator.dto.UserDto;
import com.example.passwordgenerator.domain.entity.User;
import com.example.passwordgenerator.repository.UserRepository;
import com.example.passwordgenerator.service.LoginService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseDto loginUser(UserDto userDto, HttpServletResponse response) {
        Optional<User> user = userRepository.findUserByEmail(userDto.getEmail());

        if (user.isPresent() && passwordEncoder.matches(userDto.getPassword(), user.get().getPasswordHash())) {
            jwtService.generateToken(user.get().getEmail(), response);
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
        user.setPasswordHash(passwordEncoder.encode(userDto.getPassword()));

        userRepository.save(user);
        return new ResponseDto(true, "User registered successfully");
    }

}
