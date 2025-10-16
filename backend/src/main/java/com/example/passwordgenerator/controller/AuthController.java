package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.dto.ResponseDto;
import com.example.passwordgenerator.dto.UserDto;
import com.example.passwordgenerator.service.LoginService;
import com.example.passwordgenerator.service.impl.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/passwordGenerator/auth")
public class AuthController {

    private final LoginService loginService;
    private final JwtService jwtService;

    @Autowired
    public AuthController(LoginService loginService, JwtService jwtService) {
        this.loginService = loginService;
        this.jwtService = jwtService;
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
        try {
            jwtService.validateToken(token);
            return new ResponseDto(true, "Token valid for: " + jwtService.extractEmail());
        } catch (Exception e) {
            return new ResponseDto(false, "Invalid token");
        }
    }
}
