package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.dto.ResponseDto;
import com.example.passwordgenerator.dto.UserDto;
import com.example.passwordgenerator.service.LoginService;
import com.example.passwordgenerator.service.impl.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/passwordGenerator/auth")
public class AuthController {

    private final LoginService loginService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(LoginService loginService, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.loginService = loginService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseDto register(@RequestBody UserDto userDTO) {
        return loginService.registerUser(userDTO);
    }

    @PostMapping("/login")
    public ResponseDto login(@RequestBody UserDto userDTO, HttpServletResponse response) {
        return loginService.loginUser(userDTO, response);
    }

    @GetMapping("/validate")
    public ResponseDto validate(HttpServletRequest request) {
        String token = jwtService.getJwtFromCookie(request);
        if (token == null) {
            return new ResponseDto(false, "No JWT found");
        }

        boolean valid = jwtService.validateToken(token);
        if (!valid) {
            return new ResponseDto(false, "Invalid token");
        }

        String email = jwtService.extractEmail(token);
        return new ResponseDto(true, "Token valid for: " + email);
    }

    @PostMapping("/logout")
    public ResponseDto logout(HttpServletResponse response) {
        jwtService.removeTokenFromCookie(response);
        return new ResponseDto(true, "Logged out");
    }
}